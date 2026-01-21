# 🎬 MDB7 - The Movie Database App

A modern Angular 21 application consuming the TMDB (The Movie Database) API. Built with cutting-edge technologies and best practices as part of IT Academy Barcelona's front-end developer training program.

![Angular](https://img.shields.io/badge/Angular-21.1.0-red?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=flat&logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-Latest-729B1B?style=flat&logo=vitest)
![Tests](https://img.shields.io/badge/Tests-76%20passing-success?style=flat)
![Coverage](https://img.shields.io/badge/Coverage-TDD-brightgreen?style=flat)

---

## ✨ Features

### Core Functionality
- 🎥 **Movie Browsing** - Explore movies with detailed information
- 🔍 **Movie Details** - View comprehensive details including cast, ratings, and overview
- 👤 **Actor Profiles** - Browse actor filmographies with clickable navigation
- 📄 **Pagination** - Load more movies with seamless infinite scroll
- 🎨 **TMDB-Inspired Design** - Professional UI matching official TMDB aesthetics

### Technical Excellence
- 🔐 **Firebase Authentication** - Secure login/register with email validation
- 🛡️ **Route Protection** - Auth guards with return URL preservation
- 🔄 **Bidirectional Navigation** - Seamless movies ↔ actors linking
- ♿ **Accessibility First** - Semantic HTML, ARIA labels, screen reader support
- 📱 **Responsive Design** - Mobile-first approach with TailwindCSS
- ✅ **Full TDD Coverage** - 76 behavioral tests, RED-GREEN-REFACTOR methodology

---

## 🛠️ Tech Stack

### Framework & Language
- **Angular 21** - Standalone components, Signals, modern reactive patterns
- **TypeScript 5.7** - Type-safe development

### State & Data
- **RxJS** - Reactive programming for HTTP and async operations
- **Signals** - Modern Angular state management
- **TMDB API** - Real movie data from The Movie Database

### Styling
- **TailwindCSS 4** - Utility-first CSS with custom design tokens
- **Google Fonts (Source Sans 3)** - TMDB-inspired typography

### Testing
- **Vitest** - Fast unit testing with modern API
- **Angular Testing Library** - Component testing utilities
- **HttpTestingController** - HTTP mocking for service tests

### Authentication
- **Firebase Auth** - User authentication and session management

### Build & Development
- **Bun** - Fast JavaScript runtime and package manager
- **Angular CLI** - Project scaffolding and development tools

---

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** v18+ (odd versions not recommended for production)
- **Bun** latest version ([Install Bun](https://bun.sh))
- **TMDB API Key** - [Get your free API key](https://www.themoviedb.org/settings/api)
- **Firebase Project** - [Create Firebase project](https://console.firebase.google.com)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SPRINT-7
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Environment Configuration

Create `src/environments/environment.development.ts`:

```typescript
export const environment = {
  tmdbToken: 'YOUR_TMDB_API_READ_ACCESS_TOKEN',
};

export const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

**Important:** This file is gitignored - never commit API keys!

### 4. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Email/Password** authentication in Authentication > Sign-in method
3. Copy your Firebase config to `environment.development.ts`

---

## 💻 Development

### Start Development Server

```bash
bun start
```

Navigate to `http://localhost:4200` - app auto-reloads on file changes.

### Build for Production

```bash
bun run build
```

Build artifacts stored in `dist/` directory.

---

## 🧪 Testing

This project follows **Test-Driven Development (TDD)** - all features are tested!

### Run All Tests

```bash
ng test
```

### Run Tests with UI

```bash
ng test --ui
```

### Run Specific Test File

```bash
ng test --watch=false src/app/features/movies/services/movies.spec.ts
```

### Current Test Coverage

- **76 tests** across 18 test suites
- **100% behavioral coverage** - no "should create" tests
- **Service tests** - HTTP mocking with HttpTestingController
- **Component tests** - Template rendering and user interactions
- **Guard tests** - Authentication and routing protection

---

## 📁 Project Structure

```
src/app/
├── core/
│   └── services/         # Firebase singleton services
├── features/
│   ├── actors/          # Actor details & filmography
│   │   ├── components/
│   │   ├── interfaces/
│   │   └── services/
│   ├── auth/            # Authentication (login/register)
│   │   ├── components/
│   │   ├── guards/
│   │   ├── services/
│   │   └── validators/
│   ├── home/            # Landing page
│   │   └── components/
│   └── movies/          # Movie list & details
│       ├── components/
│       ├── interfaces/
│       └── services/
├── shared/
│   ├── components/      # Reusable UI components
│   ├── constants/       # TMDB API constants
│   └── pipes/           # Custom Angular pipes
└── styles.css           # Global styles & design tokens
```

### Architecture Principles

- **Feature-based organization** - Screaming Architecture
- **Standalone components** - No NgModules
- **Signals everywhere** - Modern reactive state
- **inject() function** - No constructor injection
- **OnPush change detection** - Performance optimization

---

## 🎓 Development Methodology

### TDD Workflow (RED-GREEN-REFACTOR)

Every feature follows strict TDD:

1. **RED** - Write failing test defining expected behavior
2. **GREEN** - Implement minimal code to pass test
3. **REFACTOR** - Improve code quality while keeping tests green
4. **COMMIT** - Clean commit with descriptive message

### Angular 21 Best Practices

- ✅ Standalone components (no NgModules)
- ✅ `input()` and `output()` functions instead of decorators
- ✅ `computed()` for derived state
- ✅ Native control flow (`@if`, `@for`, `@switch`)
- ✅ `toSignal()` for Observable → Signal conversion
- ✅ `inject()` function for dependency injection
- ✅ OnPush change detection everywhere
- ✅ Semantic HTML with ARIA labels

---

## 📚 Exercises Completed

### Level I - Foundation ✅
1. ✅ Movie list display
2. ✅ Movie details page with routing
3. ✅ Pagination ("Load More" button)
4. ✅ TMDB-inspired styling
5. ✅ Landing page + navigation
6. ✅ Firebase authentication (login/register)
7. ✅ Route protection with auth guards

### Level II - Enhancement ✅
8. ✅ MovieCard reusable component
9. ✅ Actor filmography pages

### Level III - Quality ✅
10. ✅ Comprehensive test coverage (76 tests)

---

## 🔑 Key Features Detail

### Authentication
- Email/password registration with validation
- Persistent sessions (survives page refresh)
- Protected routes with auth guard
- Return URL preservation after login

### Movie Browsing
- TMDB API integration
- Movie posters and details
- Vote average percentages
- Genre tags
- Release dates and runtime

### Actor Navigation
- Actor biography and filmography
- Reuses MovieCard component
- Bidirectional navigation (movies ↔ actors)

### UI/UX
- TMDB brand colors (Navy #032541, Cyan #01b4e4)
- Responsive grid layouts
- Hover effects and transitions
- Loading states
- Accessible navigation

---

## 🤝 Contributing

This is an educational project, but feedback is welcome!

### Development Setup

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests first (TDD!)
4. Commit changes (`git commit -m 'feat: add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

### Commit Message Convention

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `test:` - Test updates
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)

---

## 📝 License

This project is part of IT Academy Barcelona's training program. For educational purposes only.

---

## 👤 Author

**Sergio**  
IT Academy Barcelona - Front-End Developer Training

---

## 🙏 Acknowledgments

- **TMDB** - Movie data API
- **IT Academy Barcelona** - Project guidelines and training
- **Firebase** - Authentication infrastructure
- **Angular Team** - Amazing framework and documentation

---

## 🔗 Useful Links

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Angular Documentation](https://angular.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)

---

**Made with ❤️, TypeScript, and lots of TDD**
