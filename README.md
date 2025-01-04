## Pet Adoption Platform Backend

This document outlines the setup, development, and deployment instructions for the backend of the Pet Adoption Platform.

### Tech Stack

- **Node.js**: Runtime environment.
- **Express.js**: For building the REST API.
- **MongoDB**: Database for storing data.
- **Mongoose**: For MongoDB object modeling.
- **Nodemailer** or **SendGrid**: For sending emails.

### Features

1. **Pet Listings Management**
   - CRUD operations for pet profiles (name, age, breed, size, medical history, etc.).

2. **User Management**
   - User registration, login, and authentication using JWT.
   - Role-based access for adopters and shelters.

3. **Application Management**
   - Handle submission and tracking of adoption applications.

4. **Messaging System**
   - Enable communication between adopters and shelters.

5. **Review System**
   - Allow users to post and view reviews for pets and shelters.

### Prerequisites

1. **Node.js** (>=14.x)
2. **MongoDB** (>=4.0)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name/pet-adoption-backend.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd pet-adoption-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/petadoption
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Project Structure

```
├── src
│   ├── controllers    # Business logic for routes
│   ├── models         # Mongoose schemas and models
│   ├── routes         # API route definitions
│   ├── middlewares    # Middleware for authentication and validation
│   ├── utils          # Utility functions
│   └── app.js         # Main application entry point
```

### API Endpoints

1. **Authentication**
   - `POST /api/auth/register` - Register a new user.
   - `POST /api/auth/login` - Authenticate a user.

2. **Pet Listings**
   - `GET /api/pets` - Fetch all pets with search and filters.
   - `POST /api/pets` - Add a new pet (shelter only).
   - `PUT /api/pets/:id` - Update a pet profile (shelter only).
   - `DELETE /api/pets/:id` - Remove a pet profile (shelter only).

3. **Applications**
   - `POST /api/applications` - Submit a new adoption application.
   - `GET /api/applications` - View applications (shelter only).
   - `PUT /api/applications/:id` - Update application status (shelter only).

4. **Reviews**
   - `POST /api/reviews` - Add a review.
   - `GET /api/reviews` - Fetch reviews.

### Testing

- Run tests using:
  ```bash
  npm test
  ```

### Deployment

1. Use a service like **Heroku** or **AWS**.
2. Ensure the environment variables are configured in the deployment environment.
3. Set up MongoDB Atlas for a production-ready database.

---
