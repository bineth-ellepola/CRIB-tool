# OAuth Integration Guide - Sejaya CRIB Tool

This guide explains how the Sejaya CRIB Tool is configured to work with the Finflux OAuth endpoint.

## OAuth Endpoint Configuration

### Token Endpoint URL
```
POST https://sejaya-uat.finflux.io/fineract-provider/api/oauth/token
```

### Authentication Type
- **Grant Type**: `password` (Resource Owner Password Credentials)
- **Content-Type**: `application/x-www-form-urlencoded`
- **Response Format**: JSON (OAuth 2.0 standard)

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the project root:

```env
# OAuth Client Credentials (optional, depends on API requirements)
VITE_OAUTH_CLIENT_ID=your_client_id
VITE_OAUTH_CLIENT_SECRET=your_client_secret

# API Base URL for data endpoints
VITE_API_URL=https://sejaya-uat.finflux.io/fineract-provider/api
```

### 2. OAuth Request Format

The application sends login requests in the following format:

```bash
POST https://sejaya-uat.finflux.io/fineract-provider/api/oauth/token

Body (form-encoded):
- username: user@example.com        (from email field)
- password: password123             (from password field)
- grant_type: password              (fixed)
- client_id: [optional]             (from VITE_OAUTH_CLIENT_ID)
- client_secret: [optional]         (from VITE_OAUTH_CLIENT_SECRET)
```

### 3. OAuth Response Format

Expected response from the OAuth endpoint:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write",
  "user_id": "123",
  "sub": "user@example.com"
}
```

The `access_token` is automatically extracted and stored for use in subsequent API calls.

## How It Works

### 1. Login Flow

```
User enters credentials
        ↓
Form-encoded OAuth request sent to token endpoint
        ↓
OAuth server validates and returns access_token
        ↓
Token stored in localStorage
        ↓
Bearer token added to all subsequent API requests
```

### 2. Token Storage

**Token is stored in localStorage with key:** `authToken`
**User info is stored in localStorage with key:** `user`
**Token expiration stored in localStorage with key:** `tokenExpiresIn`

### 3. Request Headers

All API requests include:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## API Endpoints

### Login Endpoint (OAuth Token)
```
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

Parameters:
- username (required)
- password (required)
- grant_type (required): "password"
- client_id (optional)
- client_secret (optional)

Response:
{
  "access_token": "string",
  "token_type": "Bearer",
  "expires_in": number
}
```

### Data Endpoint
```
GET /[endpoint]
Authorization: Bearer <token>

Example: GET /clients
```

Replace `/[endpoint]` with the actual Finflux API endpoint (e.g., `/clients`, `/offices`, `/users`, etc.)

## Configuration in Code

### authService.ts
Located at: `src/services/authService.ts`

The service handles:
- Form-encoded OAuth requests
- Token extraction from response
- Token storage in localStorage
- Authorization header setup

```typescript
// OAuth endpoint is hardcoded
const OAUTH_TOKEN_URL = 'https://sejaya-uat.finflux.io/fineract-provider/api/oauth/token';

// Request body is form-encoded
const params = new URLSearchParams();
params.append('username', credentials.email);
params.append('password', credentials.password);
params.append('grant_type', 'password');
```

### apiService.ts
Located at: `src/services/apiService.ts`

The service handles:
- API requests with Bearer token
- Request interceptors (adds token)
- Response interceptors (handles 401)
- Base URL configuration

```typescript
// Request interceptor adds token
this.api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Login Component Configuration

Located at: `src/components/Login.tsx`

The login form:
- Accepts email/username and password
- Sends credentials to OAuth endpoint
- Handles errors with user-friendly messages
- Shows loading state during authentication

## Troubleshooting

### Login Fails with "Invalid Credentials"
- Verify username/email is correct
- Verify password is correct
- Check if user account exists in Finflux
- Verify OAuth endpoint is accessible

### "CORS Error" or "Network Error"
- Check API URL in environment variables
- Verify server is running and accessible
- Check browser console for detailed error
- Ensure firewall allows HTTPS connections

### Token Not Persisting
- Check browser localStorage is enabled
- Verify no extensions are clearing localStorage
- Check browser dev tools → Application → Storage → localStorage

### "No Access Token Received"
- Verify OAuth endpoint returns `access_token` field
- Check API response format matches OAuth standard
- Review API documentation for response structure
- Check browser network tab for actual response

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit credentials** - Use environment variables
2. **Use HTTPS only** - All endpoints must be HTTPS in production
3. **Token in localStorage** - This is suitable for SPAs; consider alternatives for sensitive data
4. **CORS** - Ensure backend allows cross-origin requests
5. **Secrets** - Don't store client_secret in frontend code

### Secure Storage Alternative
For additional security, consider using:
- sessionStorage (cleared on browser close)
- Cookie with HttpOnly flag (needs backend support)
- IndexedDB with encryption

## API Integration Example

### Fetching Data After Login

```typescript
// In Dashboard.tsx
const fetchData = async () => {
  try {
    // This automatically includes Bearer token
    const result = await apiService.fetchData('/clients');
    setData(result);
  } catch (error) {
    setError(error.message);
  }
};
```

### Custom API Requests

```typescript
const apiInstance = apiService.getApiInstance();

// GET request
const response = await apiInstance.get('/offices');

// POST request
const response = await apiInstance.post('/clients', {
  firstname: 'John',
  lastname: 'Doe'
});

// PUT request
const response = await apiInstance.put('/clients/123', {
  firstname: 'Jane'
});

// DELETE request
await apiInstance.delete('/clients/123');
```

## Advanced Configuration

### Custom OAuth Parameters

To add custom parameters to OAuth requests, edit `src/services/authService.ts`:

```typescript
const params = new URLSearchParams();
params.append('username', credentials.email);
params.append('password', credentials.password);
params.append('grant_type', 'password');
params.append('custom_param', 'value');  // Add custom params here
```

### Token Refresh (if needed)

If your OAuth endpoint supports refresh tokens:

```typescript
async refreshToken(): Promise<string> {
  const refreshToken = localStorage.getItem('refreshToken');
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  
  const response = await this.api.post(OAUTH_TOKEN_URL, params);
  const newToken = response.data.access_token;
  localStorage.setItem('authToken', newToken);
  return newToken;
}
```

### Scope Management

If your OAuth endpoint uses scopes:

```typescript
params.append('scope', 'read write');  // Add to request
```

## Finflux API Reference

For more information on available endpoints, see the Finflux API documentation at:
```
https://sejaya-uat.finflux.io/fineract-provider/api/docs
```

Common endpoints:
- `GET /clients` - List all clients
- `GET /offices` - List all offices
- `GET /users` - List all users
- `GET /loans` - List all loans
- `GET /reports` - List reports

## Support

If you encounter issues:
1. Check error message in browser console
2. Verify OAuth endpoint URL
3. Verify credentials
4. Check API documentation
5. Review network requests in browser Dev Tools

---

**Configuration Status**: ✅ OAuth endpoint configured for Finflux

**Last Updated**: May 6, 2026
**API URL**: https://sejaya-uat.finflux.io/fineract-provider/api/oauth/token
