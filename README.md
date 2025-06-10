# 🧠 Online Quiz Platform

A modern, secure, and responsive web-based **Online Quiz Platform** built using the MERN stack with **TypeScript** for strong typing and maintainability. This platform is designed for institutions or educators to conduct online quizzes with real-time security, result analytics, and role-based access.

## 🚀 Features

- 🧑‍🎓 **Student Panel** – Take quizzes with random questions, countdown timer, and result tracking  
- 🔐 **Authentication** – Secure login and registration using JWT  
- 🎛️ **Admin Dashboard** – Manage quizzes, view results, and generate performance analytics  
- 🧠 **Quiz Randomization** – Prevents cheating using question shuffling  
- 🧩 **Screen Lock & Tab Tracking** – Alerts on tab switching, full-screen enforced during quiz  
- 📊 **Analytics** – View score charts and attempt reports using Chart.js  
- 🛡️ **Security** – Password hashing (bcrypt), protected routes, session validation

## 🛠️ Tech Stack

| Layer      | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | React.js + TypeScript, Tailwind CSS, Chart.js |
| Backend    | Node.js + Express + TypeScript    |
| Database   | MongoDB (Mongoose ODM)            |
| Auth       | JWT + bcrypt                      |

## 📁 Folder Structure

```plaintext
online-quiz-platform/
│
├── frontend/         # React + TypeScript code
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── ...
│
├── backend/          # Node + Express + TypeScript server
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── ...
│
└── README.md         # Project documentation
