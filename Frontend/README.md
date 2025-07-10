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

### User Signup

Navigate to `/signup` to create a new user account. The form requires:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Captain Signup

Navigate to `/captain-signup` to create a new captain account. The form requires:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "password123"
}
```

Replace these credentials with valid accounts registered via the backend.
