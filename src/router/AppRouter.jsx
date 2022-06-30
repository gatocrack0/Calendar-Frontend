import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore()
  // const authStatus = 'not-authenticated'
  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <div>Checking...</div>
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path='/auth/login' element={<LoginPage />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </>
            )
          : (
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
            )
      }
    </Routes>
  )
}
