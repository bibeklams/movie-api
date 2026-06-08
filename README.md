# 🎬 Movie Booking API

A RESTful Movie Booking System built with Node.js, Express.js, MongoDB, JWT Authentication, and Nodemailer.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Refresh Token Authentication
* Logout
* Protected Routes

### User Management

* Get User Profile
* Update Profile
* Change Password
* Forgot Password
* Reset Password via Email

### Movie Management

* Add Movie (Admin)
* Update Movie (Admin)
* Delete Movie (Admin)
* Get All Movies
* Get Single Movie

### Booking System

* Book Movie Tickets
* Seat Selection
* Booking History
* Cancel Booking
* Automatic Seat Availability Update

### Email Notifications

* Password Reset Email
* Booking Confirmation Email

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Email Service

* Nodemailer
* Gmail SMTP

### File Upload

* Cloudinary

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd Movie-api
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
RESET_PASSWORD_SECRET=your_reset_password_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Start Development Server

```bash
npm run dev
```

Server will run on:

```text
http://localhost:5000
```

## API Endpoints

### Auth Routes

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | /api/auth/register              |
| POST   | /api/auth/login                 |
| GET    | /api/auth/profile               |
| POST   | /api/auth/refresh-token         |
| POST   | /api/auth/logout                |
| PUT    | /api/auth/change-profile        |
| PUT    | /api/auth/change-password       |
| POST   | /api/auth/forget-password       |
| POST   | /api/auth/reset-password/:token |

### Movie Routes

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/movies     |
| GET    | /api/movies/:id |
| POST   | /api/movies     |
| PUT    | /api/movies/:id |
| DELETE | /api/movies/:id |

### Booking Routes

| Method | Endpoint                 |
| ------ | ------------------------ |
| POST   | /api/bookings/:id        |
| PUT    | /api/bookings/cancel/:id |
| GET    | /api/bookings            |

## Project Structure

```text
Movie-api/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── config/
├── uploads/
├── .env
├── server.js
└── package.json
```

## Author

Bibek Tamang

## License

This project is built for educational and portfolio purposes.
