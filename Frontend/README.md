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
    vehicleType: "car"
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

## Frontend Components

### Home Page

The main page (`Home.jsx`) features:
- Location search inputs
- Animated panels using GSAP
- Map display
- State management for:
  - Pickup location
  - Destination
  - Panel visibility
  - Vehicle selection
  - Ride confirmation

```jsx
// Component Structure
<div className="h-screen relative">
  <Logo />
  <MapView />
  <SearchPanel>
    <LocationInputs />
    <LocationSearchPanel />
  </SearchPanel>
  <VehiclePanel />
  <ConfirmRidePanel />
  <LookingForDriverPanel />
  <WaitingForDriverPanel />
</div>
```

### Location Search Panel

`LocationSearchPanel.jsx` provides:
- List of suggested locations
- Click handling for location selection
- Integration with vehicle selection panel

```jsx
// Example Location Data
const locations = [
  "F-61/2A, Near Reliance Fresh",
  "F-62/2A, Near Reliance Fresh",
  // ...more locations
];
```

### Vehicle Panel

`VehiclePanel.jsx` displays available ride options:
- UberGo (4 seater)
- Moto (1 seater)
- UberAuto (3 seater)

Each vehicle option shows:
- Vehicle image
- Capacity
- Estimated time of arrival
- Description
- Price estimate

### Confirm Ride Panel

`ConfirmRide.jsx` shows ride details:
- Pickup location
- Destination
- Vehicle type
- Fare estimate
- Payment method
- Confirmation button

```jsx
// Panel Structure
<div>
  <RideDetails>
    <PickupLocation />
    <DestinationLocation />
    <FareDetails />
  </RideDetails>
  <ConfirmButton />
</div>
```

### Looking For Driver Panel

`LookingForDriver.jsx` displays:
- Loading state while finding a driver
- Selected vehicle type
- Journey details:
  - Pickup location
  - Destination
  - Fare amount
  - Payment method

### Waiting For Driver Panel

`WaitingForDriver.jsx` displays ride details once a driver has accepted:

```jsx
// Component Structure
<div>
  <DriverInfo>
    <DriverImage />
    <DriverDetails>
      <Name>Nishant</Name>
      <VehicleNumber>DL5CP0321</VehicleNumber>
      <VehicleDescription>White Suzuki-Alto</VehicleDescription>
    </DriverDetails>
  </DriverInfo>
  
  <JourneyDetails>
    <PickupLocation>
      <Icon className="ri-map-pin-2-fill" />
      <Address>
        <Title>562/11-A</Title>
        <Description>Bhajanpura, New Delhi</Description>
      </Address>
    </PickupLocation>
    
    <DestinationLocation>
      <Icon className="ri-map-pin-user-fill" />
      <Address>
        <Title>562/11-A</Title>
        <Description>Bhajanpura, New Delhi</Description>
      </Address>
    </DestinationLocation>
    
    <PaymentInfo>
      <Icon className="ri-currency-line" />
      <Details>
        <Amount>Rs. 193.50</Amount>
        <Method>Cash</Method>
      </Details>
    </PaymentInfo>
  </JourneyDetails>
</div>
```

Features:
- Driver information display:
  - Driver's name
  - Vehicle number
  - Vehicle description (color and model)
- Journey details:
  - Pickup location with address
  - Destination location with address
  - Fare amount and payment method
- Closeable panel interface
- Real-time status updates

Styling:
- Clean, organized layout
- Clear hierarchy of information
- Prominent driver details
- Easy-to-read journey information
- Consistent icon usage for location and payment
- Mobile-optimized design

### Riding Page

`Riding.jsx` provides real-time ride tracking and payment interface:

```jsx
// Component Structure
<div className="h-screen">
  <HomeButton /> {/* Quick navigation back to home */}
  
  <MapSection>
    {/* Live tracking map with animated location marker */}
    <LiveTrackingMap />
  </MapSection>
  
  <RideDetailsSection>
    <DriverInfo>
      <DriverImage />
      <DriverDetails>
        <Name>Nishant</Name>
        <VehicleNumber>DL5CP0321</VehicleNumber>
        <VehicleDescription>White Suzuki-Alto</VehicleDescription>
      </DriverDetails>
    </DriverInfo>
    
    <JourneyDetails>
      <DestinationInfo>
        <Icon className="ri-map-pin-user-fill" />
        <Address>
          <Title>562/11-A</Title>
          <Description>Bhajanpura, New Delhi</Description>
        </Address>
      </DestinationInfo>
      
      <PaymentInfo>
        <Icon className="ri-currency-line" />
        <Details>
          <Amount>Rs. 193.50</Amount>
          <Method>Cash</Method>
        </Details>
      </PaymentInfo>
    </JourneyDetails>
    
    <PaymentButton>Make a Payment</PaymentButton>
  </RideDetailsSection>
</div>
```

Features:
- Live Tracking:
  - Real-time map visualization
  - Animated location marker
  - Dynamic route display
  - Estimated time updates
- Driver Information:
  - Profile picture
  - Name and contact details
  - Vehicle information
- Journey Details:
  - Destination address
  - Trip progress
  - Fare details
- Payment Integration:
  - Fare display
  - Payment method selection
  - Payment processing button
- Navigation:
  - Quick home button access
  - Back navigation support
  - Easy access to driver contact

Styling:
- Split-screen layout:
  - Top half: Live tracking map
  - Bottom half: Ride information
- Prominent driver details
- Clear payment information
- Action-focused payment button
- Mobile-optimized interface

State Management:
- Real-time location updates
- Trip progress tracking
- Payment status handling
- Navigation state management

The Riding page serves as the main interface during an active ride, providing real-time tracking and payment functionality in an intuitive, user-friendly layout.

### Component State Flow

1. User enters locations in Home page
2. Location Search Panel shows suggestions
3. User selects location → Vehicle Panel opens
4. User selects vehicle → Confirm Ride Panel opens
5. User confirms ride → Looking For Driver Panel shows
6. Driver accepts → Waiting For Driver Panel appears

### Animation and Transitions

The app uses GSAP for smooth animations:
```javascript
useGSAP(() => {
  // Panel animations
  gsap.to(panelRef.current, {
    height: panelOpen ? "70%" : "0%",
    padding: panelOpen ? 24 : 0,
    opacity: panelOpen ? 1 : 0
  });
});
```

### Panel Navigation

Each panel includes:
- Close button (top)
- Back navigation
- Clear state management
- Smooth transitions between states

### Styling

The app uses Tailwind CSS for styling:
- Responsive design
- Custom animations
- Consistent spacing
- Mobile-first approach

## Captain Components and Panels

#### Captain Details Panel

`CaptainDetails.jsx` displays captain's profile and statistics:

Features:
- Profile Information:
  - Profile picture
  - Captain's name
  - Total earnings display
- Statistics Dashboard:
  - Hours online
  - Speed metrics
  - Booking statistics
- Clean, metric-based layout
- Real-time earnings update

#### Ride Popup Panel

`RidePopUp.jsx` shows new ride requests:

Features:
- Ride Request Details:
  - Customer information with profile picture
  - Distance to pickup (in KM)
  - Pickup and drop locations
  - Fare details
- Action Buttons:
  - Accept ride option
  - Ignore ride option
- Dismissible panel
- Clear fare and payment information

#### Confirm Ride Popup

`ConfirmRidePopUp.jsx` handles ride confirmation:

```jsx
// Component Structure
<div>
  <Header>
    <Title>Confirm Ride</Title>
    <CloseButton />
  </Header>
  
  <CustomerInfo>
    <ProfilePicture />
    <CustomerName />
    <Distance />
  </CustomerInfo>
  
  <JourneyDetails>
    <PickupLocation />
    <DestinationLocation />
    <FareDetails />
  </JourneyDetails>
  
  <ConfirmationForm>
    <OTPInput />
    <ConfirmButton />
    <CancelButton />
  </ConfirmationForm>
</div>
```

Features:
- OTP Verification:
  - Input field for OTP
  - Form validation
- Ride Details Display:
  - Customer information
  - Location details
  - Fare breakdown
- Action Controls:
  - Confirm button
  - Cancel option
- Validation workflow

#### Captain Riding Panel

`CaptainRiding.jsx` provides the captain's ride interface:

Features:
- Live Navigation:
  - Real-time map display
  - Distance updates
  - Route visualization
- Ride Controls:
  - Complete ride button
  - Distance indicator
  - Quick logout access
- GSAP Animations:
  - Smooth panel transitions
  - Interactive UI elements
- Responsive Layout:
  - Split view design
  - Accessible controls

#### Finish Ride Panel

`FinishRide.jsx` manages ride completion:

```jsx
// Component Structure
<div>
  <Header>
    <Title>Finish This Ride</Title>
    <CloseButton />
  </Header>
  
  <CustomerSummary>
    <ProfileSection>
      <CustomerImage />
      <CustomerName />
    </ProfileSection>
    <TripDistance />
  </CustomerSummary>
  
  <JourneyDetails>
    <PickupLocation />
    <DestinationLocation />
    <FareDetails />
  </JourneyDetails>
  
  <FinishButton>Finish Ride</FinishButton>
</div>
```

Features:
- Ride Summary:
  - Customer details
  - Journey distance
  - Route information
- Payment Details:
  - Fare amount
  - Payment method
- Location Information:
  - Pickup point
  - Drop-off point
- Completion Actions:
  - Finish ride button
  - Return to home option

Styling (Common across captain panels):
- Professional color scheme
- Clear typography hierarchy
- Consistent iconography
- Mobile-optimized layouts
- Interactive elements
- Responsive design
- Status indicators
- Clear call-to-action buttons

State Management:
- Panel visibility states
- Form input handling
- Navigation state
- Ride status tracking
- Animation states
- User interactions

Navigation Flow:
1. Captain receives ride request (RidePopUp)
2. Confirms with OTP (ConfirmRidePopUp)
3. Starts navigation (CaptainRiding)
4. Completes ride (FinishRide)
5. Returns to available state

Each component follows consistent design patterns and integrates with the main application flow while maintaining a professional and user-friendly interface.
