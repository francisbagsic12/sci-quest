# Scie-Quest Backend Server

A complete backend server for the Scie-Quest educational application built with Express.js, MongoDB, and Nodemailer.

## Features

- ✅ User authentication with JWT
- ✅ Email verification with Nodemailer
- ✅ MongoDB database integration
- ✅ Password hashing with bcryptjs
- ✅ CORS support
- ✅ Security headers with Helmet
- ✅ Development mode with Nodemon
- ✅ Input validation
- ✅ Error handling

## Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- MongoDB running locally or MongoDB Atlas connection string
- Gmail account (for email verification) or any SMTP service

## Installation

1. **Navigate to backend folder**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```bash
   Copy the .env.example to .env and update with your values
   ```

4. **Configure Environment Variables**

   Edit the `.env` file with your configuration:

   ```env
   # Server
   PORT=5000
   NODE_ENV=development

   # MongoDB
   MONGO_URI=mongodb://localhost:27017/scie-quest
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/scie-quest

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d

   # Email Configuration (Gmail)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password_here
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587

   # Frontend URL
   APP_BASE_URL=http://localhost:3000
   ```

### Gmail Setup for Email Verification

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the generated password
   - Use this as `EMAIL_PASSWORD` in your `.env` file

## Running the Server

### Development Mode (with hot reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### 1. Register User

- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully. Please check your email to verify your account.",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

#### 2. Verify Email

- **POST** `/api/auth/verify-email`
- **Body:**
  ```json
  {
    "token": "verification_token_from_email"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Email verified successfully",
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

#### 3. Login User

- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "score": 0
    }
  }
  ```

#### 4. Get Current User (Protected)

- **GET** `/api/auth/me`
- **Headers:**
  ```
  Authorization: Bearer jwt_token
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "score": 0,
      "totalQuizzes": 0,
      "isEmailVerified": true,
      "completedTopics": []
    }
  }
  ```

#### 5. Health Check

- **GET** `/api/health`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Server is running"
  }
  ```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── email.js          # Nodemailer configuration
│   ├── controllers/
│   │   └── authController.js # Authentication logic
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── models/
│   │   └── User.js           # User schema
│   ├── routes/
│   │   └── authRoutes.js     # Authentication routes
│   ├── utils/
│   │   └── emailService.js   # Email utility functions
│   └── server.js             # Main server file
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore file
└── package.json              # Project dependencies
```

## Database Schema

### User Model

```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  isEmailVerified: Boolean (default: false),
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  score: Number (default: 0),
  totalQuizzes: Number (default: 0),
  completedTopics: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Email verification before login
- ✅ CORS enabled
- ✅ Helmet for HTTP headers security
- ✅ Input validation
- ✅ Environment variables for sensitive data

## Next Steps

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Set up MongoDB:**
   - If using local MongoDB, ensure it's running
   - If using MongoDB Atlas, get your connection string

3. **Configure Email:**
   - Set up Gmail App Password
   - Add credentials to `.env`

4. **Start Development Server:**

   ```bash
   npm run dev
   ```

5. **Connect Frontend:**
   - Update your frontend API base URL to `http://localhost:5000`
   - Use the authentication endpoints for user signup/login

## Troubleshooting

### Email Not Sending

- Verify Gmail App Password is correct
- Check 2FA is enabled on Gmail
- Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are correct in `.env`

### MongoDB Connection Error

- Ensure MongoDB is running
- Check `MONGO_URI` is correct
- For MongoDB Atlas, verify IP is whitelisted

### CORS Errors

- Ensure `APP_BASE_URL` matches your frontend URL
- Update `APP_BASE_URL` in `.env` if frontend runs on different port

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [JWT Documentation](https://jwt.io/)
- [Bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

## License

ISC
