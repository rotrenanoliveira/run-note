import React, { useCallback, useContext, useEffect } from 'react'

interface NotificationProps {
  // Function to trigger a native browser notification
  sendNotification: (title: string, message: string) => void
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
  // Function to send a notification if permission is granted
  const sendNotification = useCallback((title: string, message: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification(title, {
        body: message,
        icon: '/icon.png',
      })
    }
  }, [])

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permission granted')
        }
      })
    }
  }, [])

  // Effect to request permission when component mounts
  useEffect(() => {
    if ('Notification' in window) requestNotificationPermission()
  }, [requestNotificationPermission])

  // Providing the sendNotification function via context
  return <NotificationContext.Provider value={{ sendNotification }}>{children}</NotificationContext.Provider>
}
