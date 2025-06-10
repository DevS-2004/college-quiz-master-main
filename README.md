# 🎓 Online Quiz Platform

**Online Quiz Platform** is a secure and modern full-stack web application designed to help educational institutions conduct online quizzes for students. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the platform features JWT-based authentication, role-based access for students and admins, randomized quiz delivery, automatic result storage, and security features like screen locking and tab switch detection. Students can register, log in, take quizzes with timers, and view results through interactive charts, while admins can manage quizzes, view submissions, and analyze performance through dashboards. All quiz questions, user details, and results are stored securely in MongoDB Atlas. The UI is designed using modern React components and Tailwind CSS for responsiveness and clarity. With full backend logic, screen monitoring, real-time submission, and a scalable database structure, this project serves as a robust, real-world application suitable for a B.Tech 3rd-year showcase.

## 📁 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Chart.js, Axios, React Router
- **Backend**: Node.js, Express.js, JWT, bcrypt, dotenv
- **Database**: MongoDB Atlas with Mongoose ODM

## 🚀 Features

- ✅ JWT-based User Authentication (Login/Register)
- ✅ Role-based access (Student/Admin)
- ✅ Randomized quiz questions
- ✅ Timer and auto-submit
- ✅ Screen lock and tab switch detection
- ✅ Result storage in MongoDB
- ✅ Performance charts with Chart.js
- ✅ Admin dashboard for quiz and user management

## 🔐 Security

- Fullscreen enforcement during quiz
- Alert on switching tabs or windows
- JWT-protected routes and secure token storage
- Passwords hashed with bcrypt

## 🛠️ How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/DevS-2004/online-quiz-platform.git
cd online-quiz-platform
