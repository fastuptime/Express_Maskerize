const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const phonePattern = /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const ipAddressPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
const datePattern = /\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?)?/g;
const blackList = ['created_at', 'last_login', 'createdAt', 'updatedAt', 'deletedAt', 'deleted_at', 'updated_at', 'created_at', 'updated_at', 'last_login', 'lastLogin'];

const maskSensitiveData = (data) => {
    if (typeof data === 'string') {
        return data
            .replace(emailPattern, '[email protected]')
            .replace(phonePattern, '[phone protected]')
            .replace(datePattern, (match) => {
                const date = new Date(match);
                if (!isNaN(date.getTime())) {
                    return match;
                } else {
                    console.log(`Invalid date format detected: ${match}`);
                    return '[date invalid]';
                }
            });
    } else if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
            return data.map(item => maskSensitiveData(item));
        } else {
            const maskedData = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    if (!blackList.includes(key)) {
                        maskedData[key] = maskSensitiveData(data[key]);
                    } else {
                        maskedData[key] = data[key];
                    }
                }
            }
            return maskedData;
        }
    } else {
        return data;
    }
};

const maskIPAddress = (data) => {
    if (typeof data === 'string') {
        return data.replace(ipAddressPattern, '[ip protected]');
    } else if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
            return data.map(item => {
                if(blackList.includes(item)) {
                    return item;
                } else {
                    return maskIPAddress(item);
                }
            })
        } else {
            const maskedData = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    if(blackList.includes(key)) {
                        maskedData[key] = data[key];
                    } else {
                        maskedData[key] = maskIPAddress(data[key]);
                    }
                }
            }
            return maskedData;
        }
    } else {
        return data;
    }
};

const maskSensitiveDataInResponse = (req, res, next) => {
    const originalSend = res.send;
    const originalJson = res.json;

    res.send = function (data) {
        if (!res.headersSent) {
            try {
                const contentType = res.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    data = maskSensitiveData(data);
                    data = maskIPAddress(data);
                } else {
                    data = maskSensitiveData(data);
                    data = maskIPAddress(data);
                }
            } catch (error) {
                console.error('Error masking sensitive data:', error);
            }
            return originalSend.call(this, data);
        }
    };

    res.json = function (data) {
        if (!res.headersSent) {
            try {
                data = maskSensitiveData(data);
                data = maskIPAddress(data);
            } catch (error) {
                console.error('Error masking sensitive data:', error);
            }
            return originalJson.call(this, data);
        }
    };

    next();
};

module.exports = maskSensitiveDataInResponse;
