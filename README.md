# 🎯 Job Application Tracker

A modern, full-stack web application to help job seekers organize and track their job applications with style and efficiency.

![Job Tracker Banner](https://via.placeholder.com/1200x400/793d5b/ffffff?text=Job+Application+Tracker)

## ✨ Features

- **🔐 Secure Authentication** - JWT-based login and registration
- **📊 Interactive Dashboard** - Track applications with real-time status updates
- **🎨 Beautiful UI** - Modern glassmorphism design with subtle burgundy theme
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🔍 Smart Filtering** - Filter applications by status (Applied, Interview, Offer, Rejected)
- **💾 Persistent Storage** - MongoDB database with cloud hosting
- **🚀 Live Deployment** - Deployed on Render (Backend) and Vercel (Frontend)

## 🌐 Live Demo

- **Frontend**: [https://job-application-tracker-nu-pearl.vercel.app](https://job-application-tracker-nu-pearl.vercel.app)
- **Backend API**: [https://job-application-tracker-1-ywr7.onrender.com](https://job-application-tracker-1-ywr7.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sharvani-123/Job-Application-Tracker.git
   cd Job-Application-Tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Run the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
Job-Application-Tracker/
├── 📁 backend/
│   ├── 📁 config/
│   │   └── db.js
│   ├── 📁 controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── 📁 middleware/
│   │   └── authMiddleware.js
│   ├── 📁 models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── 📁 routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── server.js
│   └── package.json
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── 📁 config/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── render.yaml
├── vercel.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs for user (Protected)
- `POST /api/jobs` - Create new job application (Protected)
- `PUT /api/jobs/:id` - Update job application (Protected)
- `DELETE /api/jobs/:id` - Delete job application (Protected)

## 🎨 Design Features

- **Glassmorphism Effects** - Modern translucent design elements
- **Burgundy Color Scheme** - Eye-friendly color palette (#793d5b)
- **Animated Backgrounds** - Subtle floating orbs with pulse animations
- **Responsive Layout** - Seamless experience across all devices
- **Interactive Elements** - Hover effects and smooth transitions

## 📊 Application Flow

1. **Landing Page** - Welcome users with feature highlights
2. **Authentication** - Secure login/signup with form validation
3. **Dashboard** - Main interface for job management
4. **Job Management** - Add, edit, delete, and filter applications
5. **Status Tracking** - Visual status indicators and statistics

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes with automatic redirects
- CORS configured for specific domains
- Input validation and error handling

## 🌟 Key Highlights

- **User Experience**: Intuitive interface with glassmorphism design
- **Performance**: Optimized with Vite and efficient state management
- **Security**: Comprehensive authentication and authorization
- **Scalability**: Modular architecture with separated concerns
- **Deployment**: Production-ready with cloud hosting

## 📱 Screenshots

| Landing Page | Dashboard | Add Job Form |
|--------------|-----------|--------------|
| ![Landing](https://via.placeholder.com/300x200/793d5b/ffffff?text=Landing+Page) | ![Dashboard](https://via.placeholder.com/300x200/793d5b/ffffff?text=Dashboard) | ![Form](https://via.placeholder.com/300x200/793d5b/ffffff?text=Add+Job) |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sharvani**
- GitHub: [@Sharvani-123](https://github.com/Sharvani-123)
- Project: [Job Application Tracker](https://github.com/Sharvani-123/Job-Application-Tracker)

## 🙏 Acknowledgments

- Design inspiration from modern glassmorphism trends
- Icons and animations from various open-source libraries
- MongoDB Atlas for reliable database hosting
- Vercel and Render for seamless deployment

---

<div align="center">

**[⬆ Back to Top](#-job-application-tracker)**

Made with ❤️ for job seekers everywhere

</div>
