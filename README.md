# 📚 Virtual Study Room – StudyInn

StudyInn is a collaborative virtual study platform that connects learners from diverse backgrounds based on their interests. Whether you're studying alone or seeking peer motivation, StudyInn provides a seamless experience through structured study rooms, real-time video calls,  and resource sharing capabilities.

---

🔍 Overview

StudyInn allows users to:
- Join topic-based study rooms to connect with strangers sharing similar interests.
- Engage in real-time discussions through video calls and chat.
- Share and access academic notes and resources.
- Build consistent study habits through a streak-based engagement system.

This project aims to make virtual learning more interactive, personalized, and productive by removing social hesitation and encouraging collaboration in a user-friendly environment.

✨ Key Features

🏠 Interest-Based Study Rooms
- Join rooms focused on specific subjects or areas of study.
- Match and collaborate with like-minded individuals in real time.

💬 Text & Video Communication
- Integrated video conferencing using WebRTC.
- Real-time chat system with message persistence.

📁 Notes Sharing System
- Upload, search, and manage study materials (PDFs, lecture notes)

🔥 Streak System
- Encourages regular study through visual streak indicators.
- Gamified approach to improve consistency and retention.

🏗 Tech Stack

| Frontend        | Backend          | Database | Others                        |
|-----------------|------------------|----------|-------------------------------|
| HTML, CSS       | Node.js, Express | MongoDB  | WebRTC, Socket.io, Multer     |

📁Folder-Structure

Virtual-Study-Room/
├── node_modules/ (npm packages)
├── public/
│   ├── chat/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── styles.css
│   ├── home/
│   │   ├── auth.html
│   │   ├── authtstyle.css
│   │   ├── firebase.js
│   │   ├── getstarted.css
│   │   ├── getstarted.html
│   │   ├── index.html
│   │   ├── logo3.png
│   │   ├── logo4.png
│   │   ├── logo5.png
│   │   ├── reviews.js
│   │   ├── script.js
│   │   ├── signin.html
│   │   ├── signup.html
│   │   └── styles.css
│   ├── notesApp/
│   │   ├── models/
│   │   │   └── File.js
│   │   ├── node_modules/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   └── styles.css
│   │   ├── routes/
│   │   │   └── fileRoutes.js
│   │   ├── uploads/
│   │   ├── .env
│   │   ├── app.js
│   │   ├── package-lock.json
│   │   └── package.json
│   └── videoChat/
│       ├── dist/
│       │   ├── assets/
│       │   ├── index.html
│       │   └── vite.svg
│       ├── node_modules/
│       ├── public/
│       │   └── vite.svg
│       ├── src/
│       │   ├── assets/
│       │   ├── app.css
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── eslint.config.js
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── README.md
│       ├── render.yaml
│       └── vite.config.js
├── package-lock.json
├── package.json
└── server.js (main Express server)
