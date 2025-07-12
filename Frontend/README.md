## Frontend Usage

### User Login

Navigate to `/login` to sign in as a user. The form requires:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Captain Login

Navigate to `/captain-login` to sign in as a captain. The form requires:
```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

Replace these credentials with valid accounts registered via the backend.

## API Integration

### Environment Setup

Create a `.env` file in the root directory:
```env
VITE_BASE_URL=http://localhost:8000/api
```

### User API Integration

#### Register User
```javascript
const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, {
  fullname: {
    firstname: "John",
    lastname: "Doe"
  },
  email: "john.doe@example.com",
  password: "password123"
});

// Response:
{
  message: "User registered successfully",
  user: {
    fullname: { firstname: "John", lastname: "Doe" },
    email: "john.doe@example.com",
    _id: "user_id"
  },
  token: "jwt_token"
}
```

#### Login User
```javascript
const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
  email: "john.doe@example.com",
  password: "password123"
});

// Response:
{
  message: "User logged in successfully",
  user: {
    fullname: { firstname: "John", lastname: "Doe" },
    email: "john.doe@example.com",
    _id: "user_id"
  },
  token: "jwt_token"
}
```

#### Get User Profile
```javascript
const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Response:
{
  _id: "user_id",
  fullname: { firstname: "John", lastname: "Doe" },
  email: "john.doe@example.com"
}
```

#### Logout User
```javascript
const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Response:
{
  message: "User logged out successfully"
}
```

### Captain API Integration

#### Register Captain
```javascript
const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, {
  fullname: {
    firstname: "Jane",
    lastname: "Smith"
  },
  email: "jane.smith@example.com",
  password: "password123",
  vehicle: {
    color: "Red",
    plate: "ABC123",
    capacity: 4,
    vehicleType: "car" // "car" | "auto" | "moto"
  }
});

// Response:
{
  message: "Captain registered successfully",
  captain: {
    fullname: { firstname: "Jane", lastname: "Smith" },
    email: "jane.smith@example.com",
    vehicle: {
      color: "Red",
      plate: "ABC123",
      capacity: 4,
      vehicleType: "car"
    },
    _id: "captain_id"
  },
  token: "jwt_token"
}
```

#### Login Captain
```javascript
const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, {
  email: "jane.smith@example.com",
  password: "password123"
});

// Response:
{
  message: "Captain logged in successfully",
  captain: {
    fullname: { firstname: "Jane", lastname: "Smith" },
    email: "jane.smith@example.com",
    vehicle: {
      color: "Red",
      plate: "ABC123",
      capacity: 4,
      vehicleType: "car"
    },
    _id: "captain_id"
  },
  token: "jwt_token"
}
```

#### Get Captain Profile
```javascript
const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Response:
{
  message: "Captain profile fetched successfully",
  captain: {
    _id: "captain_id",
    fullname: { firstname: "Jane", lastname: "Smith" },
    email: "jane.smith@example.com",
    vehicle: {
      color: "Red",
      plate: "ABC123",
      capacity: 4,
      vehicleType: "car"
    }
  }
}
```

#### Logout Captain
```javascript
const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Response:
{
  message: "Captain logged out successfully"
}
```

### Protected Routes
To protect routes that require authentication:

1. Check for token in localStorage
2. Include token in request headers
3. Redirect to login if unauthorized

Example Protected Route Wrapper:
```jsx
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  
  return children;
};
```

Usage:
```jsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  } 
/>
```

### Captain Protected Routes

Example Captain Protected Route Wrapper:
```jsx
const CaptainProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { setCaptain } = useContext(CaptainContext);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return;
    }

    // Verify captain's token and get profile
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        setCaptain(response.data.captain);
        setIsLoading(false);
      }
    })
    .catch(err => {
      console.error(err);
      localStorage.removeItem('token');
      navigate('/captain-login');
    });
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};
```

Usage:
```jsx
<Route 
  path="/captain-home" 
  element={
    <CaptainProtectedRoute>
      <CaptainHome />
    </CaptainProtectedRoute>
  } 
/>
```

### Vehicle Type Validation

When registering a captain, ensure the vehicle type is one of:
- `car`
- `auto`
- `moto`

Example vehicle type selection:
```jsx
<select
  value={vehicleType}
  onChange={(e) => setVehicleType(e.target.value)}
  required
>
  <option value="" disabled>Select Vehicle Type</option>
  <option value="car">Car</option>
  <option value="auto">Auto</option>
  <option value="moto">Moto</option>
</select>
```

### Error Handling
Handle common API errors:
```javascript
try {
  const response = await axios.post('/api/users/login', credentials);
  // Handle success
} catch (error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        // Handle validation errors
        break;
      case 401:
        // Handle unauthorized
        break;
      case 404:
        // Handle not found
        break;
      default:
        // Handle other errors
    }
  }
}
```
