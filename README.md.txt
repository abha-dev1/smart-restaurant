# Smart Restaurant Management System
A full-stack, cloud-native web application built with React (Vite), Node.js, Express, and MongoDB.

## Features
- **JWT Authentication**: Role-based access control (Customer/Admin).
- **Interactive Menu**: Local real-time filtering, category index sorting.
- **Redux Order Management**: Dynamic cart pipeline with server calculated pricing.
- **Table Reservation**: Form component featuring live time slot double-booking checks.
- **Customer Feedback**: Direct CRUD database operations for user reviews.

## Setup Instructions
1. Clone the project and navigate to the root directory.
2. To run the backend, go to `/backend`, create a `.env` file, run `npm install`, then `npm run seed` and `npm run dev`.
3. To run the frontend, go to `/frontend`, run `npm install`, then `npm run dev`.
