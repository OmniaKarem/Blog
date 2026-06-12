# Blog API

A RESTful API for a personal blogging platform.

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with DB and JWT variables
4. Run `npm run dev`

## Endpoints
- POST /auth/register
- POST /auth/login
- GET /posts
- POST /posts (protected)
- PUT /posts/:id (protected)
- DELETE /posts/:id (protected)

## Database
MySQL with Sequelize ORM. One-to-many relationship between Users and Posts.
