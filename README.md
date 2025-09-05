# Population Analysis System Backend

A modular backend starter template for the KSUSTA Population Analysis System using TypeScript, Express.js, Prisma ORM with SQLite, session-based authentication, bcrypt for password hashing, express-validator for input validation, and Helmet for security hardening.

## Features

- MVC architecture with modular structure
- TypeScript for type safety
- Express.js for API routing
- Prisma ORM with SQLite database
- Session-based authentication
- Input validation with express-validator
- Security hardening with Helmet
- CRUD operations for students, staff, faculties, and departments
- Population analytics and reporting

## Project Structure

```
├── prisma/
│   ├── schema.prisma    # Prisma schema definition
│   └── seed.ts          # Database seeding script
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validators/      # Input validation rules
│   └── index.ts         # Application entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd server
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=5000
SESSION_SECRET=your_session_secret
DATABASE_URL="file:../dev.db"
```

4. Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed the database with initial data

```bash
npm run seed
```

### Running the Application

#### Development mode

```bash
npm run dev
```

#### Production mode

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/change-password` - Change admin password

### Students

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Staff

- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get staff by ID
- `POST /api/staff` - Create new staff
- `PUT /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Delete staff

### Faculties

- `GET /api/faculties` - Get all faculties
- `GET /api/faculties/:id` - Get faculty by ID
- `POST /api/faculties` - Create new faculty
- `PUT /api/faculties/:id` - Update faculty
- `DELETE /api/faculties/:id` - Delete faculty

### Departments

- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Analytics

- `GET /api/analytics/students/gender` - Get student analytics by gender
- `GET /api/analytics/students/level` - Get student analytics by level
- `GET /api/analytics/students/department` - Get student analytics by department
- `GET /api/analytics/students/faculty` - Get student analytics by faculty
- `GET /api/analytics/staff/gender` - Get staff analytics by gender
- `GET /api/analytics/staff/department` - Get staff analytics by department
- `GET /api/analytics/summary` - Get overall population summary

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## License

This project is licensed under the MIT License.