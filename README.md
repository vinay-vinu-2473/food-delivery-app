# Food Delivery App

A modern food delivery application built with Next.js, Tailwind CSS, and MongoDB.

## Features

- User authentication (login/signup)
- Menu browsing with search and filters
- Shopping cart functionality
- Checkout process with multiple payment options
- Order tracking with real-time updates
- User account management
- Admin dashboard for managing food items, orders, and users

## Technologies

- Next.js
- React
- Tailwind CSS
- MongoDB
- Socket.IO (for real-time updates)
- Formik & Yup (for forms and validation)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (create `.env.local` file)
4. Run the development server: `npm run dev`
5. Build for production: `npm run build && npm run start`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NEXT_PUBLIC_API_URL`: URL for your API
- `NEXT_PUBLIC_SOCKET_URL`: URL for Socket.IO server
- `BACKEND_URL`: URL for your backend server (if different)

## Deployment

The app can be deployed to Vercel, Netlify, or any other hosting provider that supports Next.js applications.

For production, make sure to:
- Set up a MongoDB database
- Configure environment variables
- Enable HTTPS
- Set up proper monitoring and logging