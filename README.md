# 🚀 MERN Stack Portfolio

A full-stack portfolio web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.
It includes an **admin dashboard**, **authentication system**, **project/blog management**, and modern UI with animations.

---

## ✨ Features

### 🌐 Frontend

* React.js (Vite)
* Tailwind CSS (responsive design)
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

| Frontend      | Backend    | Tools      |
| ------------- | ---------- | ---------- |
| React + Vite  | Node.js    | Git        |
| Tailwind CSS  | Express.js | Cloudinary |
| Zustand       | MongoDB    | Nodemailer |
| Framer Motion | JWT Auth   |            |

---

## 📁 Project Structure

```
mern-stack-portfolio/
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
│   └── index.html
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mern-stack-portfolio.git
cd mern-stack-portfolio
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file in **backend/**

```env
PORT=
MONGO_URI=
JWT_SECRET=
EMAIL_HOST=
EMAIL_USER=
EMAIL_PASS=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=
```

👉 Never commit your `.env` file to GitHub.

---

### 4️⃣ Run the Application

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm run dev
```

---

## 🌍 Application URLs

* Frontend: http://localhost:5173
* Backend: http://localhost:5000/api
* Admin Panel: http://localhost:5173/admin

---

## 👨‍💻 Admin Setup

Create admin user:

```bash
cd backend
npm run create-admin
```

> ⚠️ Make sure admin credentials are set via environment variables.

---

## 🚀 Deployment

### Frontend

* Deploy on **Vercel** or **Netlify**

### Backend

* Deploy on **Render** or **Railway**

---

## 📌 Important Notes

* Do not expose `.env` file
* Use strong passwords for admin
* Rotate secrets before deployment
* Use production database for live app

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
