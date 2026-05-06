# Implementation Guide

This document provides detailed guidance on how to integrate this React application with your actual backend API.

## Backend API Requirements

Your backend API should provide the following endpoints:

### 1. Authentication Endpoint

**Endpoint:** `POST /login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid credentials"
}
```

### 2. Data Endpoint

**Endpoint:** `GET /data`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success - 200):**
```json
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
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "department": "Marketing",
      "salary": 65000,
      "status": "Active"
    }
  ]
}
```

**Response (Error - 401):**
```json
{
  "error": "Unauthorized"
}
```

## Environment Configuration

### Development Environment

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:3000
```

### Production Environment

For production, you can set environment variables through your hosting provider or build process:

```env
VITE_API_URL=https://api.yourdomain.com
```

## API Service Customization

### Default Configuration

The application uses Axios with interceptors. If your API requires customization:

**File:** `src/services/apiService.ts`

```typescript
// Add custom headers
this.api.defaults.headers.common['X-Custom-Header'] = 'value';

// Add request transformation
this.api.interceptors.request.use((config) => {
  // Customize request
  return config;
});

// Add response transformation
this.api.interceptors.response.use(
  (response) => {
    // Transform response
    return response;
  },
  (error) => {
    // Handle error
    return Promise.reject(error);
  }
);
```

### Changing the Data Endpoint

The Dashboard component fetches data from `/data` endpoint. To change this:

**File:** `src/components/Dashboard.tsx`

```typescript
// Change this line:
const result = await apiService.fetchData<TableData>('/data');

// To your endpoint:
const result = await apiService.fetchData<TableData>('/users');
// or
const result = await apiService.fetchData<TableData>('/api/v1/employees');
```

## Authentication Customization

### Custom Token Key

If your API returns the token under a different property name:

**File:** `src/services/authService.ts`

```typescript
async login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await this.api.post<any>('/login', credentials);
  const { accessToken, user } = response.data; // Change 'token' to 'accessToken'
  
  localStorage.setItem('authToken', accessToken);
  return {
    token: accessToken,
    user
  };
}
```

### Token Refresh (Optional)

Add token refresh functionality:

```typescript
async refreshToken(): Promise<string> {
  try {
    const response = await this.api.post<{ token: string }>('/refresh');
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return token;
  } catch (error) {
    this.logout();
    throw error;
  }
}
```

Then update the response interceptor to handle 401s:

```typescript
this.api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await authService.refreshToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return this.api(error.config);
      } catch {
        authService.logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

## Data Format Customization

### Dynamic Columns

The table automatically generates columns from the API response. To customize which columns are displayed:

**File:** `src/components/Table.tsx`

```typescript
const columns = useMemo(() => {
  if (data.length === 0) return [];
  
  const columnSet = new Set<string>();
  
  // Define which columns to show (optional filtering)
  const allowedColumns = ['id', 'name', 'email', 'status'];
  
  data.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (allowedColumns.includes(key)) {
        columnSet.add(key);
      }
    });
  });
  
  return Array.from(columnSet);
}, [data]);
```

### Custom Column Names

To customize column display names:

```typescript
const columnNames: { [key: string]: string } = {
  'email': 'Email Address',
  'dept': 'Department',
  'empId': 'Employee ID'
};

<th key={column}>{columnNames[column] || formatColumnName(column)}</th>
```

## XML Export Customization

### Custom Root Element

To change the XML root element from `<data>` to something else:

**File:** `src/components/Dashboard.tsx`

```typescript
const handleExportXML = () => {
  downloadTableAsXML(data, 'table_data.xml', 'employees'); // 'employees' is the root element
};
```

### Custom XML Structure

For more complex XML structures, modify `src/utils/xmlConverter.ts`:

```typescript
export const convertToAdvancedXML = (data: TableData[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<export>\n';
  xml += `  <metadata>\n`;
  xml += `    <exportDate>${new Date().toISOString()}</exportDate>\n`;
  xml += `    <totalRecords>${data.length}</totalRecords>\n`;
  xml += `  </metadata>\n`;
  xml += `  <records>\n`;
  
  data.forEach((row, index) => {
    xml += `    <record id="${index + 1}">\n`;
    Object.entries(row).forEach(([key, value]) => {
      const sanitizedKey = sanitizeXMLKey(key);
      const escapedValue = escapeXML(String(value ?? ''));
      xml += `      <${sanitizedKey}>${escapedValue}</${sanitizedKey}>\n`;
    });
    xml += `    </record>\n`;
  });
  
  xml += `  </records>\n`;
  xml += `</export>`;
  return xml;
};
```

## Error Handling Customization

### Custom Error Messages

To provide more specific error messages based on API response:

**File:** `src/services/apiService.ts`

```typescript
async fetchData<T>(endpoint: string = '/data'): Promise<T[]> {
  try {
    const response = await this.api.get<{ data: T[] }>(endpoint);
    return response.data.data || response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Failed to fetch data: ${message}`);
    }
    throw error;
  }
}
```

## CORS Configuration

If your frontend and API are on different origins, ensure your backend has CORS enabled:

**Example Node.js/Express:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Testing with Mock API

For development without a real backend, use a mock API service:

**File:** `src/services/mockApiService.ts`

```typescript
export const mockLogin = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock_token_' + Date.now(),
        user: { id: '1', email, name: 'Mock User' }
      });
    }, 500);
  });
};

export const mockFetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
      ]);
    }, 500);
  });
};
```

Then use these in your components during development:

```typescript
const result = await mockFetchData(); // Instead of apiService.fetchData()
```

## Debugging

Enable detailed logging by adding this to `src/services/apiService.ts`:

```typescript
this.api.interceptors.request.use((config) => {
  console.log('API Request:', config);
  return config;
});

this.api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

## Deployment Considerations

1. **Environment Variables**: Ensure API URLs are set correctly in production
2. **Token Security**: Never expose tokens in network requests through insecure protocols (use HTTPS)
3. **CORS**: Configure appropriate CORS settings on your backend
4. **Token Expiration**: Implement token refresh logic for long-lived sessions
5. **API Rate Limiting**: Handle rate limit responses gracefully
6. **Error Messages**: Don't expose sensitive information in production error messages

## Common Issues and Solutions

### CORS Error
- Ensure backend allows requests from your frontend origin
- Check Authorization header is properly included

### Token Not Being Sent
- Verify token is stored in localStorage
- Check Authorization header is set in interceptors
- Ensure token hasn't expired

### API Endpoint Not Found
- Verify correct endpoint URL in environment variables
- Check network tab in browser dev tools
- Ensure backend server is running

### XML Export Issues
- Verify data is loaded before attempting export
- Check for special characters in data that need escaping
- Ensure column names are valid XML element names
