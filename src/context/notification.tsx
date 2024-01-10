import React, { useCallback, useContext, useEffect } from 'react'

const isServer = typeof window === 'undefined'

interface NotificationProps {
  // Function to trigger a native browser notification
  sendNotification: (message: string) => void
}

interface NotificationProviderProps {
  children: React.ReactNode
}

// Context to provide notification functionality throughout the app
const NotificationContext = React.createContext({} as NotificationProps)

// Custom hook to use notification context
export const useNotification = () => useContext(NotificationContext)

// Component to provide notification context to its children
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }: NotificationProviderProps) => {
  // Determine the current permission status for notifications
  const permission = isServer ? null : Notification.permission

  // Function to send a notification if permission is granted
  const sendNotification = useCallback(
    (message: string) => {
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(message)
      }
    },
    [permission],
  )

  // Effect to request permission when component mounts
  useEffect(() => {
    if (isServer) return
    if (!('Notification' in window)) return

    if (permission !== 'granted' && permission !== 'denied') {
      Notification.requestPermission()
    }
  }, [])

  // Providing the sendNotification function via context
  return <NotificationContext.Provider value={{ sendNotification }}>{children}</NotificationContext.Provider>
}
