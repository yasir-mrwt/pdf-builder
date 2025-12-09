# 📄 PDF Builder & Generator - Frontend

A modern, professional PDF generation platform built with React, Tailwind CSS, and Vite.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🔐 **Authentication System** - Login/Signup with JWT-ready architecture
- 📝 **PDF Generator** - Easy-to-use form with live preview
- ⬇️ **Download System** - Secure download (login required)
- 🔗 **Share Functionality** - Generate shareable links
- 🎯 **Toast Notifications** - Beautiful feedback system
- 🚀 **Fast Performance** - Optimized with Vite

## 🛠️ Tech Stack

- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Context API** - State management

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd pdf-builder-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Open your browser**

```
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Toast.jsx
│   └── Navbar.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── GeneratorPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   └── DownloadPage.jsx
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   └── useToast.js
├── utils/              # Utility functions
│   └── router.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Key Features Explained

### Authentication

- User signup and login
- Persistent sessions (localStorage)
- Protected routes
- User profile display

### PDF Generation

- Simple form interface
- Live preview
- Input validation
- Data persistence

### Download System

- Login-required downloads
- Shareable links (no auth needed)
- Copy-to-clipboard functionality

### UI Components

- **Button** - 4 variants with icon support
- **Input** - Text, email, password with validation
- **Card** - Container with hover effects
- **Toast** - Auto-dismissing notifications

## 🚀 Deployment

### Build for production

```bash
npm run build
```

The `dist` folder will contain your production-ready files.

### Deploy to Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🔧 Configuration

### Tailwind CSS

Configuration in `tailwind.config.js`. Customize colors, fonts, and animations.

### Environment Variables

Create `.env` file for API endpoints:

```
VITE_API_URL=http://localhost:5000/api
```

## 📝 Next Steps (Backend Integration)

1. Replace mock functions with real API calls
2. Implement JWT token management
3. Add PDF generation library (jsPDF, PDFKit)
4. Connect to MongoDB
5. Add file upload functionality
6. Implement email notifications

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for your portfolio or commercial projects.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

## 🙏 Acknowledgments

- Icons by Lucide React
- Styled with Tailwind CSS
- Built with Vite

---

**Need help?** Open an issue or reach out!
