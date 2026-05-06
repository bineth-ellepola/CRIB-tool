# Quick Start Guide

Get your Sejaya CRIB Tool up and running in minutes!

## 5-Minute Setup

### 1. Installation
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app opens at: **http://localhost:5173**

### 3. Login
Use demo credentials:
- Email: `demo@example.com`
- Password: `password123`

### 4. Try Features
- ✅ View sample data in table
- ✅ Click "Refresh Data" button
- ✅ Click "Convert to XML" to download XML file
- ✅ Click "Logout" to test login flow

## Configuration for Your API

### Step 1: Create `.env.local`
```env
VITE_API_URL=http://your-api-url.com
```

### Step 2: Update API Endpoints (if needed)
- Login endpoint: `POST /login`
- Data endpoint: `GET /data`

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for detailed customization.

## Project Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## File Structure Quick Reference

```
src/
├── components/      # UI components (Login, Dashboard, Table)
├── services/        # API and Auth services
├── context/         # React Context (Authentication)
├── utils/           # Utilities (XML conversion)
├── types/           # TypeScript types
└── styles/          # CSS files
```

## Features Overview

### 🔐 Authentication
- Login with email/password
- Token stored securely
- Auto-logout on token expiration

### 📊 Data Display
- Dynamic table from API
- Responsive design
- Mobile-friendly

### 💾 XML Export
- Convert table to XML
- Download as file
- Proper formatting

### 🛡️ Protected Routes
- Only logged-in users access dashboard
- Auto-redirect to login if needed

## Common Customizations

### Change Login Credentials Validation
File: `src/components/Login.tsx`

### Modify Table Columns
File: `src/components/Table.tsx`

### Customize XML Structure
File: `src/utils/xmlConverter.ts`

### Update API Endpoints
Files: `src/services/authService.ts`, `src/services/apiService.ts`

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run build
```

### API Connection Issues
1. Check `.env.local` has correct API URL
2. Verify backend API is running
3. Check browser console for errors
4. Ensure CORS is enabled on backend

## Next Steps

1. **Setup Backend**: Create API endpoints matching documentation
2. **Update Config**: Set `VITE_API_URL` in `.env.local`
3. **Test Login**: Verify credentials work with your API
4. **Customize UI**: Modify styles and components as needed
5. **Deploy**: Build and deploy to production

## Deployment

### Production Build
```bash
npm run build
```

Outputs to `dist/` folder. Deploy these files to your hosting.

### Environment Variables (Production)
Set `VITE_API_URL` on your hosting platform:
- Vercel: Add to Environment Variables
- Netlify: Add to Build environment
- Docker: Pass as build arg or env var

## Support Resources

- 📖 See [README.md](./README.md) for full documentation
- 🔧 See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for API integration details
- 💻 Check TypeScript types in `src/types/index.ts`
- 🎨 Modify styles in `src/styles/`

## Demo Workflow

1. **Login Page**: Enter demo credentials or your API credentials
2. **Dashboard**: View data in responsive table
3. **Refresh**: Click "Refresh Data" to reload
4. **Export**: Click "Convert to XML" to download XML file
5. **Logout**: Click "Logout" to return to login

That's it! You now have a fully functional React application with authentication, data fetching, and XML export.

Happy coding! 🚀
