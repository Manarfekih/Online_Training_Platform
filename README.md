# Online Training Platform - Microservices Architecture

## 📘 1. Project Overview

This project is a **Node.js microservices-based Online Training Platform** built using modern distributed system principles.

It demonstrates:

* 🧩 Microservices architecture
* 🔗 gRPC synchronous communication
* 🌐 REST API via API Gateway
* 🔷 GraphQL flexible querying
* 📡 Apache Kafka event-driven messaging
* 🗄️ PostgreSQL per microservice database

---

## 🧱 2. System Architecture

### 📌 Architecture Diagram

<img width="1046" height="693" alt="archi" src="https://github.com/user-attachments/assets/af5a2e0c-40ff-40ad-b43e-e343a1bc2bb6" />



### 🧠 System Flow Summary

* Client sends requests via Postman / browser
* API Gateway handles REST + GraphQL
* Gateway communicates with microservices using gRPC
* Enrollment Service publishes Kafka events
* Notification Service consumes Kafka events
* Each service uses its own PostgreSQL database

---

## ⚙️ 3. Microservices

| Service              | Port        | Role                        |
| -------------------- | ----------- | --------------------------- |
| API Gateway          | 3000        | REST + GraphQL entry point  |
| User Service         | 50051       | User management             |
| Course Service       | 50052       | Course management           |
| Enrollment Service   | 50053       | Enrollment + Kafka producer |
| Notification Service | 50054       | Kafka consumer              |

---

## 📄 4. gRPC Communication (.proto files)

### 👤 User Service

Handles:

* CreateUser
* GetUser
* GetAllUsers
* UpdateUser
* DeleteUser
* SearchUsers

---

### 📚 Course Service

Handles:

* CreateCourse
* GetCourse
* GetAllCourses
* UpdateCourse
* DeleteCourse
* SearchCourses

---

### 🧾 Enrollment Service

Handles:

* EnrollUser
* GetEnrollment
* GetAllEnrollments
* DeleteEnrollment

---

### 🔔 Notification Service

Handles:

* GetAllNotifications
* GetNotificationsByUser

---

## 🌐 5. REST API (API Gateway)

### 👤 Users

```
POST   /users
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
GET    /users/search/:keyword
```

### 📚 Courses

```
POST   /courses
GET    /courses
GET    /courses/:id
PUT    /courses/:id
DELETE /courses/:id
GET    /courses/search/:keyword
```

### 🧾 Enrollments

```
POST   /enrollments
GET    /enrollments
GET    /enrollments/:id
DELETE /enrollments/:id
```

### 🔔 Notifications

```
GET /notifications
GET /notifications/user/:user_id
```

---

## 🔷 6. GraphQL API

### 📍 Endpoint

```
http://localhost:3000/graphql
```

### 📌 Features

GraphQL allows:

* Fetching only required fields
* Aggregating data from multiple services
* Flexible queries without multiple REST calls

---

### 📌 Example Query

```graphql
query {
  users {
    id
    name
    email
  }
}
```

---

### 📌 Example Mutation

```graphql
mutation {
  createUser(name: "Ali", email: "ali@test.com", password: "123456") {
    id
    name
    email
  }
}
```

---

## 📡 7. Kafka Event Streaming

### 📌 Topic Used

```
enrollment_created
```

### 📌 Event Flow

```
User Enrolls in Course
        ↓
Enrollment Service
        ↓ (Kafka Producer)
Kafka Broker
        ↓
Notification Service (Consumer)
        ↓
Notification Stored in DB
```

---

### 📌 Kafka Message Format

```json
{
  "event": "ENROLLMENT_CREATED",
  "userId": 1,
  "courseId": 3,
  "timestamp": "2026-05-17T10:00:00Z"
}
```

---

## 🗄️ 8. Databases (PostgreSQL)

Each microservice has its own database:

| Service              | Database         |
| -------------------- | ---------------- |
| User Service         | users_db         |
| Course Service       | courses_db       |
| Enrollment Service   | enrollments_db   |
| Notification Service | notifications_db |



## Database Setup

Create the databases:

CREATE DATABASE users_db;

CREATE DATABASE courses_db;

CREATE DATABASE enrollments_db;

CREATE DATABASE notifications_db;


Import schemas:

psql -U postgres -d users_db -f database/users_db.sql

psql -U postgres -d courses_db -f database/courses_db.sql

psql -U postgres -d enrollments_db -f database/enrollments_db.sql

psql -U postgres -d notifications_db -f database/notifications_db.sql


---

## 🚀 9. Installation & Setup

### 📌 Prerequisites

* Node.js (v18+)
* PostgreSQL
* Apache Kafka

---

### 1. Install dependencies

```bash
npm install
```

---

### 2. Start PostgreSQL

Create databases:

```sql
CREATE DATABASE users_db;
CREATE DATABASE courses_db;
CREATE DATABASE enrollments_db;
CREATE DATABASE notifications_db;
```

---

### 3. Start Kafka (Windows)

```bash
cd kafka

# Kafka broker
bin\windows\kafka-server-start.bat config\server.properties

#Create topic
kafka-topics --create --topic enrollment_created --bootstrap-server localhost:9092
```

---

### 4. Start all services

```bash
npm run start:all
```

This runs:

* API Gateway
* User Service
* Course Service
* Enrollment Service
* Notification Service

---

### 5. Access System

| Service  | URL                                                            |
| -------- | -------------------------------------------------------------- |
| REST API | [http://localhost:3000](http://localhost:3000)                 |
| GraphQL  | [http://localhost:3000/graphql](http://localhost:3000/graphql) |

---

##  10. Postman Workspace 

**Link** : https://www.postman.com/meniarfekih-567362/workspace/online-training-platform

---

## 🧪 11. Testing Flow

### Full Scenario

1. Create User
2. Create Course
3. Create Enrollment
4. Kafka triggers notification
5. Check notifications endpoint

---

## 12. Key Features

* ✔ Microservices architecture
* ✔ REST + GraphQL API Gateway
* ✔ gRPC communication
* ✔ Kafka event-driven system
* ✔ Independent PostgreSQL databases
* ✔ Real-time notifications

---



##  13. Conclusion

This project demonstrates a full **enterprise-style microservices system** with synchronous (gRPC) and asynchronous (Kafka) communication, exposing both REST and GraphQL APIs through a central gateway.

---
