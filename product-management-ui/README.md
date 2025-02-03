# Product Management UI

This project is the frontend component of the Product Management System, built with Angular.

## Features

- User Authentication
- Product List with Search and Sort
- Product Creation and Editing
- Responsive Design
- Form Validation
- JWT Token Management
- HTTP Interceptors for Auth
- Route Guards for Protected Routes

## Development Setup

### Prerequisites

- Node.js (version 20.14.0 or later)
- npm (version 8.16.0 or later)
- Angular CLI (version 18.2.14 or later)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

```
src/
├── app/
│   ├── components/         # UI components
│   │   ├── login/
│   │   ├── product-list/
│   │   └── product-form/
│   ├── services/          # API services
│   ├── models/            # TypeScript interfaces
│   ├── guards/            # Route guards
│   └── interceptors/      # HTTP interceptors
├── assets/                # Static files
└── environments/          # Environment configurations
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Tests

- `ng test` - Execute unit tests via Karma
- `ng e2e` - Execute end-to-end tests

## Code Style

This project follows the [Angular Style Guide](https://angular.io/guide/styleguide). Key points:

- Use TypeScript's strict mode
- Follow Angular's naming conventions
- Implement proper component lifecycle management
- Use strong typing with interfaces
- Implement proper error handling
- Follow reactive programming patterns with RxJS

## Dependencies

- @angular/core - Angular framework
- @angular/forms - Form handling
- @angular/router - Routing
- rxjs - Reactive programming
- typescript - Type support

## Environment Configuration

The application uses two environments:

- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment

Configure the API URL and other environment-specific variables in these files.

## Security

- JWT token authentication
- Route guards for protected routes
- HTTP interceptors for auth headers
- Form validation
- XSS protection
- CSRF protection

## Contributing

1. Follow the Angular style guide
2. Write clear commit messages
3. Add proper documentation
4. Include unit tests
5. Update README if needed

## Further Help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
