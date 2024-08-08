# 🛡️ Express Maskerize: Protect Sensitive Data in Your Express.js Responses

Welcome to **Express Maskerize**! 🎉 This middleware helps you effortlessly mask sensitive data like emails, phone numbers, IP addresses, and dates in your Express.js responses. Keep your logs clean and your users' data secure with just a few lines of code. 

![image](https://github.com/user-attachments/assets/e1d2b51f-1fdc-4e6b-978c-2038d991dddc)

## 🚀 Features

- **Email Masking**: Protects email addresses in your data.  
  ```js
  john.doe@example.com ➡️ [email protected]
  ```

- **Phone Number Masking**: Masks phone numbers to maintain privacy.  
  ```js
  +1 (555) 555-5555 ➡️ [phone protected]
  ```

- **IP Address Masking**: Safeguards IP addresses in your data.  
  ```js
  192.168.1.1 ➡️ [ip protected]
  ```

- **Automatic Field Detection**: Masks sensitive data without requiring any manual configuration.

## 🔧 Usage

Integrate Express Maskerize into your Express.js application:

```javascript
const express = require('express');
const maskerize = require('./maskerize');

const app = express();

app.use(maskerize);

app.get('/data', (req, res) => {
    const data = {
        email: 'john.doe@example.com',
        phone: '+1 (555) 555-5555',
        ip: '192.168.1.1',
        createdAt: '2024-08-08T10:00:00Z'
    };
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## 🎨 Screenshots

![image](https://github.com/user-attachments/assets/42b0a3e6-76d4-434d-87a9-b661dc76c348)

![image](https://github.com/user-attachments/assets/6feea497-3a70-4059-bd4e-3431631d1bbd)

![image](https://github.com/user-attachments/assets/39f1ef3b-bbd9-408f-b944-ddcc8de07c02)


---

👋 **Thank you for using Express Maskerize!** Keep your users' data safe and secure!
