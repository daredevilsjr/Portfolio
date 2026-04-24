Here’s a **clean, direct copy-paste README (no weird formatting, no ids, ready for GitHub)** 👇

---

# 🚀 MERN Stack Portfolio – Full Stack Developer Dashboard

A modern full-stack portfolio web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.
It includes a secure admin dashboard, authentication system, project/blog management, and a modern responsive UI.

---

## 🌟 Live Demo

* 🌐 Frontend: *(add your deployed link)*
* ⚙️ Backend API: *(add your backend URL)*
* 🔐 Admin Panel: `/admin`

---

## ✨ Features

### 🌐 Frontend

* React.js (Vite)
* Tailwind CSS (responsive UI)
* Zustand (state management)
* React Router
* Framer Motion (animations)
* Dark Mode support

### ⚙️ Backend

* Node.js + Express.js REST API
* MongoDB with Mongoose
* JWT Authentication (HTTP-only cookies)
* bcrypt password hashing
* Cloudinary (image uploads)
* Nodemailer (email service)

### 🔐 Admin Dashboard

* Secure admin login
* Manage projects (CRUD)
* Blog management
* Profile & DSA updates
* Contact message handling

---

## 🛠️ Tech Stack

Frontend: React, Tailwind CSS, Zustand, Framer Motion
Backend: Node.js, Express.js, MongoDB, JWT
Tools: Cloudinary, Nodemailer, Git

---

## 📁 Project Structure

```
Portfolio/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── utils/
│   └── index.html
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/daredevilsjr/Portfolio.git
cd Portfolio
```

---

### 2. Install Dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd frontend
npm install
```

---

### 3. Environment Variables

Create a `.env` file in **backend/**

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email
EMAIL_PASS=your_password

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CLIENT_URL=http://localhost:5173
```
Create a `.env` file in **frontend/**
```
VITE_API_URL=http://localhost:5000/api

CLIENT_URL=http://localhost:5173
```
---

### 4. Run the Application

#### Backend

```
cd backend
npm run dev
```

#### Frontend

```
cd frontend
npm run dev
```

---

## 🔐 Admin Setup

```
cd backend
npm run create-admin
```

---

## 🌍 Routes Overview

* `/` → Home
* `/projects` → Projects
* `/blog` → Blog
* `/contact` → Contact
* `/admin` → Admin Dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make changes
4. Submit a pull request

---

## 📄 License

MIT License

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---
