# Pet Adoption Platform

A full-stack pet adoption platform where adopters can browse pets, add favorites, apply for adoption, and submit reviews. Shelters can manage pets and handle adoption applications.

---

## Features

### User Authentication

* Register & Login (Adopter / Shelter)
* Role-based access control

### Pet Listings

* View all pets (Adopter)
* Add pets (Shelter)
* Edit pets (Shelter)
* Filter pets by name, age, color, and size

### Adoption Applications

* Apply for pet adoption (Adopter)
* View submitted applications
* Approve / Reject applications (Shelter)

### Favorites

* Add pets to favorites
* Remove pets from favorites
* View favorite pets list

### Reviews & Ratings

* Adopters can submit reviews
* Star rating system
* View reviews on pet details page

---

## Tech Stack

**Frontend**

* React
* Redux Toolkit
* Tailwind CSS
* React Router

**Backend**

* Node.js
* Express.js
* Multer (Image Upload)

**Database**

* MongoDB (MongoDB Atlas)

---

## Project Structure

```
frontend/
backend/
```

---

## Environment Variables

Frontend `.env`

```
VITE_API_URL=http://localhost:3000
```

Backend `.env`

```
PORT=3000
MONGO_URI=your_mongodb_connection
```

---

## Installation

### Clone Repository

```
git clone <repo-url>
```

### Backend Setup

```
cd backend
npm install
npm start
```

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## Demo Credentials

### Adopter

```
Email: testedlogin@gmail.com
Password: tested
```

### Shelter

```
Email: testedshelter@gmail.com
Password: shelter
```

---

## Screens

* Pets Listing Page
* Pet Details Page
* Favorites Page
* Applications Page
* Login / Register Page

---

## API Documentation

Swagger UI available at:

```
/api-docs
```

---

## Features Implemented

* Role Based Authorization
* Pet CRUD
* Adoption Workflow
* Favorites System
* Reviews System
* Image Upload
* Filtering
* Responsive UI

---

## Author

Pet Adoption Platform
