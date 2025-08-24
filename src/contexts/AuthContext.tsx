import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { authAPI } from '@/services/api'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  profileImage?: string
  totalPoints: number
  currentStreak: number
  longestStreak: number
  role: string
  emailVerified: boolean
  phoneVerified: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = Cookies.get('token')
      
      if (savedToken) {
        try {
          const response = await authAPI.verifyToken(savedToken)
          if (response.data.valid) {
            setToken(savedToken)
            setUser(response.data.user)
          } else {
            Cookies.remove('token')
          }
        } catch (error) {
          console.error('Token verification failed:', error)
          Cookies.remove('token')
        }
      }
      
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await authAPI.login({ email, password })
      
      const { token: newToken, user: userData } = response.data
      
      setToken(newToken)
      setUser(userData)
      
      // Store token in cookie (expires in 7 days)
      Cookies.set('token', newToken, { expires: 7, secure: true, sameSite: 'strict' })
      
      toast.success('Login successful!')
      
      // Redirect to dashboard or intended page
      const redirectTo = router.query.redirect as string || '/dashboard'
      router.push(redirectTo)
      
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: SignupData) => {
    try {
      setLoading(true)
      const response = await authAPI.signup(userData)
      
      const { token: newToken, user: newUser } = response.data
      
      setToken(newToken)
      setUser(newUser)
      
      // Store token in cookie
      Cookies.set('token', newToken, { expires: 7, secure: true, sameSite: 'strict' })
      
      toast.success('Account created successfully!')
      
      // Redirect to dashboard
      router.push('/dashboard')
      
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed'
      toast.error(message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    Cookies.remove('token')
    toast.success('Logged out successfully')
    router.push('/')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}