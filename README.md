# 🎓 University gRPC Server

A simple and modular gRPC server built with Node.js and MySQL to manage university operations such as students, courses, classes, and enrollments.

---

## 🚀 Features

- Add and manage **students**, **lessons**, **classes**, and **enrollments**
- Create and assign lessons to specific terms
- Register students in specific lessons per term
- Full MySQL integration
- Built-in input validation and error handling
- Modular service-based architecture

---

## 📁 Project Structure


├── proto/ # .proto definitions for gRPC services
│ ├── student.proto
│ ├── lesson.proto
│ ├── class.proto
│ └── ...
├── services/ # gRPC service implementations
│ ├── studentService.js
│ ├── lessonService.js
│ └── ...
├── utils
├── config
├── index.js # gRPC server bootstrap
├── package.json
└── README.md

---

## ⚙️ Installation

# Clone the repository
git clone [https://github.com/yourusername/university-grpc-server.git](https://github.com/PMahdiDehghaniP/universityPorject.git
cd universityPorject

# Install dependencies
npm install

