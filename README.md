Here’s a cleaned-up and well-structured version of your **README.md** that follows best practices for open-source documentation:

---

# 🖥️ Biometric Face Authentication Server

A **Node.js + TypeScript** server that provides **facial recognition-based authentication** using machine learning models. Users can register with facial data, authenticate using face recognition, and securely manage sessions.

---

## ✨ Features

- 🔐 **Face-based Authentication** – Login using facial recognition
- 👤 **User Registration** – Register users with face enrollment
- 🛡️ **Secure Sessions** – JWT-based authentication & session management
- 🎯 **Real-time Face Detection** – Powered by TensorFlow\.js & face-api.js
- 📊 **Database Integration** – PostgreSQL with Prisma ORM
- 🚀 **Docker Support** – Containerized deployment
- 🔒 **Security** – Helmet.js, CORS, bcrypt, and input validation
- 📝 **Logging** – Request logging middleware

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js
- **Database**: PostgreSQL + Prisma ORM
- **ML Models**: TensorFlow\.js + face-api.js
- **Authentication**: JWT + bcrypt
- **File Uploads**: Multer
- **Security**: Helmet.js, CORS
- **Package Manager**: pnpm
- **Deployment**: Docker

---

## 📦 Prerequisites

- Node.js **18+** or Docker
- PostgreSQL database
- pnpm (preferred package manager)

---

## ⚡ Installation

### 🔹 Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd biometric/server
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure the following in `.env`:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/biometric_db"
   JWT_SECRET="your-super-secure-jwt-secret"
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed   # optional
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

---

### 🔹 Docker Deployment

```bash
docker build -t face-auth-server .
docker run -p 5000:5000 --env-file .env face-auth-server
```

For production:

```bash
docker build -t face-auth-server:prod .
docker run -d \
  --name face-auth-server \
  -p 5000:5000 \
  --env-file .env.production \
  face-auth-server:prod
```

---

## 📂 Project Structure

```
src/
├── index.ts                 # Main application entry point
├── types.ts                 # TypeScript type definitions
├── responses.ts             # Standardized API responses
├── middleware/
│   ├── errorHandler.ts      # Global error handling
│   └── requestLogger.ts     # Request logging
├── routes/
│   ├── auth.route.ts        # Authentication endpoints
│   └── user.route.ts        # User management endpoints
├── services/
│   └── face.service.ts      # Face recognition ML service
└── utils/                   # Utility functions

models/                      # Pre-trained ML models
├── face_landmark_68_model*
├── face_recognition_model*
└── ssd_mobilenetv1_model*

prisma/
├── schema.prisma            # Database schema
├── migrations/              # Database migrations
└── seed.ts                  # Database seeding

uploads/                     # Uploaded face images
```

---

## 🔗 API Endpoints

### 🔑 Authentication

- `POST /api/auth/register` → Register new user with face enrollment
- `POST /api/auth/login` → Login via face recognition
- `POST /api/auth/logout` → Logout & invalidate session
- `GET /api/auth/verify` → Verify JWT token

### 👤 Users

- `GET /api/users/profile` → Get user profile
- `PUT /api/users/profile` → Update profile
- `DELETE /api/users/profile` → Delete account

### 🏥 Health

- `GET /health` → Server health check

---

## 🧠 Face Recognition Models

- **SSD MobileNet V1** – Face detection
- **Face Landmark 68** – Landmark detection
- **Face Recognition** – Face encoding & comparison

Models are **automatically loaded** on server startup by `face.service.ts`.

---

## 🗄️ Database Schema

- **Users** – Accounts with encrypted face encodings
- **Sessions** – Active user sessions
- **Face Data** – Stored face encodings for recognition

(See `prisma/schema.prisma` for details.)

---

## 🔒 Security Features

- **Password Hashing** – bcrypt + salt rounds
- **JWT Authentication** – Secure token-based sessions
- **CORS** – Restricted origins
- **Helmet.js** – Security headers
- **Validation** – Input validation on requests
- **Error Handling** – Centralized & secure error responses

---

## 👨‍💻 Development Scripts

```bash
# Development with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Database migrations
pnpm prisma:migrate

# Generate Prisma client
pnpm prisma:generate

# Reset database
pnpm prisma:reset
```

---

## ⚠️ Troubleshooting

**Model Loading Issues**

- Ensure all model files are in `/models`
- Check file permissions & paths

**Database Issues**

- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists

**Face Recognition Issues**

- Ensure good image quality & lighting
- Verify camera permissions
- Face must be clearly visible

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Commit your changes:

   ```bash
   git commit -am "Add new feature"
   ```

4. Push to branch:

   ```bash
   git push origin feature/new-feature
   ```

5. Submit a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file.

---

## 💬 Support

- Open an issue in the repository
- Check the documentation
- Review troubleshooting guide

---
