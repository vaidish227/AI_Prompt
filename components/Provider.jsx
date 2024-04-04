'use client'
// Importing necessary modules from React
import React from 'react'

// Importing SessionProvider from next-auth/react for handling sessions
import { SessionProvider } from 'next-auth/react'

// Definition of the Provider component
const Provider = ({ children, session }) => {
  return (
    // Wrapping the application with SessionProvider to provide session context
    <SessionProvider session={session}>
      {/* Rendering children components */}
      {children}
    </SessionProvider>
  )
}

// Exporting the Provider component
export default Provider
