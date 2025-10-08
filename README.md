# Student Exam System

A full-stack student exam module built with **React.js**, **Node.js/Express**, and **MongoDB**.  
Includes authentication, randomized questions, exam interface, and results.

---

## 🚀 Features 
- User Registration & Login (JWT Authentication)
- Start Exam with randomized questions
- Navigate (Next/Previous) through MCQs
- Countdown Timer (30 mins)
- Submit Exam & View Results

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express, MongoDB
- **Auth**: JWT
- **Testing**: Postman

---
## 📬 API Endpoints

### 🔑 Authentication

```http
POST /api/auth/register
Content-Type: application/json
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```
```http
POST /api/auth/login
Content-Type: application/json
Body:
{
  "email": "john@example.com",
  "password": "123456"
}

Response:
{
  "token": "<jwt_token>"
}

```
```http
GET /api/exam/questions
Headers:
Authorization: Bearer <token>

```
```http
POST /api/exam/submit
Headers:
Authorization: Bearer <token>
Content-Type: application/json
Body:
{
  "answers": [
    { "questionId": "123", "selectedOption": "B" },
    { "questionId": "124", "selectedOption": "C" }
  ]
}

```
```http
GET /api/results/:id
Headers:
Authorization: Bearer <token>

```
---

## 🔧 Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/your-username/student-exam-system.git
cd student-exam-system
