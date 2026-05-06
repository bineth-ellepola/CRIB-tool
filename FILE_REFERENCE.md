# Project File Reference

Complete guide to all files in the Sejaya CRIB Tool project.

## 📋 Documentation Files

| File | Purpose | Read Time |
|------|---------|-----------|
| [START_HERE.md](./START_HERE.md) | **Start here** - Overview and quick navigation | 5 min |
| [QUICKSTART.md](./QUICKSTART.md) | Get running in 5 minutes with demo | 5 min |
| [README.md](./README.md) | Full documentation with all features | 20 min |
| [IMPLEMENTATION.md](./IMPLEMENTATION.md) | API integration and customization guide | 30 min |
| [COMPLETION.md](./COMPLETION.md) | Verification of all requirements | 5 min |
| [FILE_REFERENCE.md](./FILE_REFERENCE.md) | This file - files and their purposes | 10 min |

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and npm scripts |
| `tsconfig.json` | TypeScript configuration (root) |
| `tsconfig.app.json` | TypeScript configuration (app) |
| `tsconfig.node.json` | TypeScript configuration (build) |
| `vite.config.ts` | Vite build tool configuration |
| `eslint.config.js` | ESLint linting configuration |
| `.env.example` | Environment variables template |
| `.gitignore` | Git ignore file |
| `index.html` | HTML entry point |

## 📁 Source Files

### Root Files (`src/`)

| File | Purpose |
|------|---------|
| `main.tsx` | Application entry point (mounts React) |
| `App.tsx` | Main app component with routing |
| `App.css` | App-level global styles |
| `index.css` | Global CSS styles |

### Components (`src/components/`)

| File | Purpose | What It Does |
|------|---------|-------------|
| `Login.tsx` | Login page component | Renders login form, handles credentials |
| `Dashboard.tsx` | Main dashboard page | Shows table, refresh button, export button |
| `Table.tsx` | Reusable table component | Renders data in responsive table |
| `ProtectedRoute.tsx` | Route protection wrapper | Guards routes, redirects to login |
| `index.ts` | Component exports | Barrel export for clean imports |

### Services (`src/services/`)

| File | Purpose | Provides |
|------|---------|----------|
| `authService.ts` | Authentication service | Login, logout, token management |
| `apiService.ts` | API request service | HTTP requests with auth interceptors |

### Context (`src/context/`)

| File | Purpose | Provides |
|------|---------|----------|
| `AuthContext.tsx` | Auth state management | AuthContext, AuthProvider, useAuth hook |

### Utilities (`src/utils/`)

| File | Purpose | Exports |
|------|---------|---------|
| `xmlConverter.ts` | XML conversion utilities | convertToXML, downloadXML, downloadTableAsXML |

### Types (`src/types/`)

| File | Purpose | Defines |
|------|---------|---------|
| `index.ts` | Type definitions | LoginRequest, LoginResponse, AuthContextType, etc. |

### Styles (`src/styles/`)

| File | Purpose | Covers |
|------|---------|--------|
| `auth.css` | Authentication styles | Login page styling and layout |
| `dashboard.css` | Dashboard styles | Dashboard header, controls, main layout |
| `table.css` | Table styles | Table styling, rows, columns, responsive |

## 📦 Build Outputs

| Path | Purpose |
|------|---------|
| `dist/` | Production build output (created by `npm run build`) |
| `node_modules/` | Installed dependencies |

## 🎯 Key File Functions

### Component Files

**Login.tsx** (130 lines)
- Login form with email/password
- Error message display
- Loading state
- Redirect to dashboard on success

**Dashboard.tsx** (80 lines)
- Fetches data from API
- Displays data in table
- Refresh and export buttons
- User info and logout

**Table.tsx** (80 lines)
- Dynamic column generation
- Responsive design
- Formatting helpers
- Cell value display

**ProtectedRoute.tsx** (20 lines)
- Route guard wrapper
- Checks authentication
- Redirects to login if needed

### Service Files

**authService.ts** (80 lines)
- Login function with API call
- Token storage/retrieval
- localStorage management
- Authorization header setter
- Logout function

**apiService.ts** (70 lines)
- Axios instance with interceptors
- Request interceptor (adds token)
- Response interceptor (handles 401)
- Fetch data function
- Auto-refresh on token expiration

### Utility Files

**xmlConverter.ts** (120 lines)
- XML structure generation
- Special character escaping
- XML element name sanitization
- File download function
- Main export function

### Context Files

**AuthContext.tsx** (80 lines)
- AuthContext creation
- AuthProvider component
- useAuth hook
- State management (token, user, loading)
- Login/logout handlers

### Type Definition Files

**types/index.ts** (35 lines)
- LoginRequest interface
- LoginResponse interface
- AuthContextType interface
- TableData interface
- ApiResponse interface

## 🔗 File Dependencies

```
App.tsx
├── AuthProvider (from AuthContext.tsx)
├── BrowserRouter (from react-router-dom)
└── Routes
    ├── Login.tsx
    ├── ProtectedRoute.tsx
    │   └── Dashboard.tsx
    │       ├── Table.tsx
    │       ├── apiService (from services/)
    │       ├── useAuth hook (from AuthContext.tsx)
    │       └── xmlConverter (from utils/)
    └── Navigate components

Components:
├── Login.tsx
│   ├── useAuth hook
│   └── useNavigate
├── Dashboard.tsx
│   ├── useAuth hook
│   ├── useNavigate
│   ├── apiService
│   ├── Table component
│   └── xmlConverter
├── Table.tsx
│   └── No external dependencies
└── ProtectedRoute.tsx
    ├── useAuth hook
    └── Navigate

Services:
├── authService.ts
│   └── axios
└── apiService.ts
    ├── axios
    └── authService

Context:
└── AuthContext.tsx
    └── authService
```

## 📊 File Size Reference

| File | Size | Lines |
|------|------|-------|
| Login.tsx | 3KB | 130 |
| Dashboard.tsx | 3KB | 85 |
| Table.tsx | 2KB | 75 |
| ProtectedRoute.tsx | 0.5KB | 20 |
| authService.ts | 2.5KB | 70 |
| apiService.ts | 2KB | 65 |
| AuthContext.tsx | 2.5KB | 70 |
| xmlConverter.ts | 3.5KB | 120 |
| types/index.ts | 0.8KB | 35 |

**Total Source Code: ~20KB (~670 lines)**

## ✅ Implementation Checklist by File

- [x] **main.tsx** - React entry point configured
- [x] **App.tsx** - Routing with protected routes
- [x] **Login.tsx** - Form, validation, API call
- [x] **Dashboard.tsx** - Data fetch, display, controls
- [x] **Table.tsx** - Dynamic columns, responsive
- [x] **ProtectedRoute.tsx** - Route guard logic
- [x] **authService.ts** - Auth and token management
- [x] **apiService.ts** - API with interceptors
- [x] **AuthContext.tsx** - State management
- [x] **xmlConverter.ts** - XML generation
- [x] **types/index.ts** - Type definitions
- [x] **Styling** - auth.css, dashboard.css, table.css
- [x] **Config** - tsconfig, vite.config, package.json

## 🚀 Getting Started with Files

1. **Start with:** [START_HERE.md](./START_HERE.md)
2. **Then read:** [QUICKSTART.md](./QUICKSTART.md)
3. **Browse:** [src/components/Login.tsx](./src/components/Login.tsx)
4. **Review:** [src/services/authService.ts](./src/services/authService.ts)
5. **Examine:** [src/types/index.ts](./src/types/index.ts)

## 💡 Modification Guide

| Want to Change | Edit File |
|---|---|
| Login styling | `src/styles/auth.css` |
| Dashboard layout | `src/styles/dashboard.css` |
| Table styling | `src/styles/table.css` |
| Login form | `src/components/Login.tsx` |
| Table columns | `src/components/Table.tsx` |
| API endpoints | `src/services/apiService.ts` |
| Auth logic | `src/services/authService.ts` |
| XML structure | `src/utils/xmlConverter.ts` |
| Type definitions | `src/types/index.ts` |
| Routing | `src/App.tsx` |

## 📚 Learning Path

1. **File 1:** Read `[START_HERE.md](./START_HERE.md)` (entry point)
2. **File 2:** Read `src/types/index.ts` (understand data structures)
3. **File 3:** Read `src/context/AuthContext.tsx` (understand state)
4. **File 4:** Read `src/components/Login.tsx` (see UI in action)
5. **File 5:** Read `src/services/authService.ts` (understand auth)
6. **File 6:** Read `src/components/Dashboard.tsx` (see integration)
7. **File 7:** Read `[IMPLEMENTATION.md](./IMPLEMENTATION.md)` (API details)

---

All files are well-commented and follow React/TypeScript best practices. Ready to explore!
