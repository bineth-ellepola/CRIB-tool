# Sejaya CRIB Tool - React Web Application

A complete React web application built with modern best practices, featuring authentication, API integration, data fetching, dynamic table rendering, and XML export functionality.

## Features

✨ **Authentication**
- Secure login page with token-based authentication
- JWT token storage in localStorage
- Automatic token inclusion in all API requests (Bearer token)
- Session persistence across browser reloads
- Protected routes requiring authentication

🛡️ **Route Protection**
- Protected routes that only authenticated users can access
- Automatic redirection to login for unauthorized access
- Route guards based on authentication state

📊 **Data Display**
- Responsive data table with dynamic column rendering
- Columns automatically generated from API response data
- Alternating row colors for better readability
- Hover effects for better UX

💾 **XML Export**
- Convert table data to properly formatted XML
- Download XML files with customizable naming
- Proper XML structure with rows and columns
- XML special character escaping

🎨 **UI/UX**
- Modern, responsive design
- Clean and intuitive interface
- Mobile-friendly layouts
- Gradient backgrounds and smooth transitions
- Professional color scheme

## Project Structure

```
src/
├── components/              # React components
│   ├── Login.jsx           # Login page component
│   ├── Dashboard.jsx       # Main dashboard with table
│   ├── Table.jsx           # Reusable table component
│   ├── ProtectedRoute.jsx  # Route protection wrapper
│   └── index.js            # Component exports
├── services/               # API services
│   ├── authService.js      # Authentication service
│   └── apiService.js       # API request service with interceptors
├── context/                # React Context
│   └── AuthContext.js     # Authentication context with hooks
├── utils/                  # Utility functions
│   └── xmlConverter.js     # XML conversion utilities
├── styles/                 # CSS stylesheets
│   ├── auth.css            # Authentication page styles
│   ├── dashboard.css       # Dashboard styles
│   └── table.css           # Table component styles
├── App.jsx                 # Main app component with routing
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Modern web browser

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173/`

## Configuration

### API Configuration

To connect to your own API, update the API URLs in the service files:

**src/services/authService.js:**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://your-api.com';
```

**src/services/apiService.js:**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://your-api.com';
```

Set environment variables in a `.env` file:
```
VITE_API_URL=http://your-api.com
```

### API Endpoints Required

**Login Endpoint:**
```
POST /login
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Data Endpoint:**
```
GET /data
Authorization: Bearer <token>

Response:
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Engineering",
      "salary": 75000,
      "status": "Active"
    },
    // more rows...
  ]
}
```

## Usage

### Login

1. Navigate to the login page
2. Enter your credentials
3. Click "Login" button
4. On successful login, you'll be redirected to the dashboard

**Demo credentials (for testing):**
- Email: `demo@example.com`
- Password: `password123`

### Dashboard

Once logged in, you can:

1. **View Data**: The dashboard displays data from the API in a responsive table
2. **Refresh Data**: Click "Refresh Data" button to fetch the latest data
3. **Export to XML**: Click "Convert to XML" button to download data as XML file
4. **Logout**: Click "Logout" button to clear your session

### XML Export

The XML export feature:
- Converts table data to proper XML format
- Creates downloadable XML file
- Preserves all data columns and rows
- Properly escapes XML special characters
- Sanitizes column names for valid XML element names

Example XML output:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
  <row id="1">
    <id>1</id>
    <name>John Doe</name>
    <email>john@example.com</email>
    <department>Engineering</department>
    <salary>75000</salary>
    <status>Active</status>
  </row>
  <!-- more rows... -->
</data>
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting (if configured)
npm run lint
```

## Key Technologies

- **React 18**: UI library with hooks
- **React Router v6**: Client-side routing
- **TypeScript**: Static type checking
- **Axios**: HTTP client with interceptors
- **Vite**: Modern build tool
- **CSS3**: Responsive styling

## Authentication Flow

1. **Login**: User enters credentials, which are sent to the login API
2. **Token Storage**: On successful login, the JWT token is stored in localStorage
3. **Request Interceptor**: All API requests automatically include the Bearer token
4. **Session Persistence**: Token persists across page reloads
5. **Protected Routes**: Routes check for valid token before allowing access
6. **Auto-Logout**: Invalid/expired tokens trigger automatic redirect to login

## Error Handling

- API errors are caught and displayed to users
- Network errors show appropriate error messages
- Invalid credentials trigger helpful feedback
- Session expiration redirects to login automatically
- Missing or corrupted data shows user-friendly messages

## Responsive Design

The application is fully responsive:
- **Desktop**: Full layout with all features
- **Tablet**: Optimized table with adjusted padding
- **Mobile**: Stacked layout, simplified navigation
- **Small screens**: Horizontal scroll for tables

## Best Practices Implemented

✅ Component composition and reusability
✅ Custom React hooks (useAuth)
✅ Context API for state management
✅ TypeScript for type safety
✅ Error boundary patterns
✅ Loading and error states
✅ Secure token handling
✅ API interceptors
✅ Responsive CSS
✅ Accessibility considerations
✅ Clean code structure
✅ Proper separation of concerns

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**Login not working?**
- Check API endpoint configuration
- Verify server is running and accessible
- Check browser console for errors
- Ensure credentials are correct

**Table not loading?**
- Verify API endpoint URL
- Check authentication token is valid
- Review API response format
- Check network tab in browser dev tools

**XML download not working?**
- Ensure data is loaded in the table
- Check browser's download settings
- Verify filename doesn't contain invalid characters

**Session expires immediately?**
- Check token expiration time on server
- Verify token format is correct
- Check localStorage is enabled

## License

MIT License - Feel free to use this project for your needs.

## Support

For issues or questions, please refer to the component documentation or review the TypeScript type definitions for detailed interfaces.

## Future Enhancements

Potential additions:
- User profile management
- Advanced table filtering and sorting
- Multiple export formats (CSV, JSON)
- Dark mode support
- User role-based access control
- Password reset functionality
- Two-factor authentication
- Data caching strategy
