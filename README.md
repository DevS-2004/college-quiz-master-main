# 🎓 Online Quiz Platform

**Online Quiz Platform** is a secure and modern full-stack web application designed to help educational institutions conduct online quizzes for students. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the platform features JWT-based authentication, role-based access for students and admins, randomized quiz delivery, automatic result storage, and security features like screen locking and tab switch detection. Students can register, log in, take quizzes with timers, and view results through interactive charts, while admins can manage quizzes, view submissions, and analyze performance through dashboards. All quiz questions, user details, and results are stored securely in MongoDB Atlas. The UI is designed using modern React components and Tailwind CSS for responsiveness and clarity. With full backend logic, screen monitoring, real-time submission, and a scalable database structure, this project serves as a robust, real-world application suitable for a B.Tech 3rd-year showcase.


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
| Auth       | JWT + bcrypt       


## 🔐 Security

- Fullscreen enforcement during quiz
- Alert on switching tabs or windows
- JWT-protected routes and secure token storage
- Passwords hashed with bcrypt


