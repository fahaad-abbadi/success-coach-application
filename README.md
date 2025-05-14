# SilentEdge Backend API

SilentEdge is a modern, secure, and scalable backend API designed for an anonymous discussion and voting platform. It leverages Java, Spring Boot, JPA (Hibernate), JWT authentication, and follows industry standards for service, repository, and model layers.

## Purpose

SilentEdge enables users to:
- Register and login anonymously.
- Create and manage discussion posts categorized by topics.
- Comment on posts and engage in threaded discussions.
- Vote on posts and comments.

## Architecture Overview

The system is structured with the following key components:
- **User Management:** Anonymous user registration and JWT-based authentication.
- **Post Management:** CRUD operations for posts, categorized under various topics.
- **Comment Management:** Nested comments supporting multi-level discussions.
- **Voting System:** Supports voting on both posts and comments.
- **Category Management:** Allows dynamic creation and management of categories.

## Technology Stack

- **Language:** Java 17+
- **Framework:** Spring Boot
- **ORM:** Hibernate (JPA)
- **Database:** MySQL / PostgreSQL (JPA compatible)
- **Security:** Spring Security, JWT Authentication
- **Logging:** SLF4J, Lombok
- **Model Mapping:** ModelMapper

## Database Schema Overview

Entities and their relationships:

- **User:** One to many relationship with posts and comments.
- **Post:** Many to one with user and category; one to many with comments.
- **Comment:** Many to one with post and user; supports self-referencing for replies.
- **Vote:** Associated with either post or comment; records vote type.

## Key Features

### User Authentication & Authorization
- JWT based secure login.
- Anonymous user identification.
- Role-based access controls (USER, ADMIN).

### Post & Category Management
- CRUD operations for posts and categories.
- Listing posts by creation date, category filter.

### Commenting System
- Supports nested comments (parent and child relationships).
- CRUD operations on comments.

### Voting System
- Supports voting (upvote/downvote) on posts and comments.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/silentedge-backend.git
   cd silentedge-backend
   ```

2. **Configure the database**
   - Update `application.properties` with your DB credentials.

3. **Build and run the project**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the API documentation (Optional Swagger UI if integrated)**
   ```
   http://localhost:8080/swagger-ui.html
   ```

## Security

- Passwords are hashed using BCrypt.
- JWT tokens are generated and validated for secured endpoints.
- All sensitive routes are protected via Spring Security.

## Contributing

1. Fork the repository.
2. Create your feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License

This project is licensed under the MIT License.

---
