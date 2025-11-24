'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import api from '@/lib/apiClient'

// Define a minimal user type for JWT
export type JwtUser = {
  id: string
  email: string
  full_name?: string
  phoneNumber?: string
  address?: string
  role?: string
  membershipType?: string,
  membershipActive?: boolean,
}

type AuthContextType = {
  user: JwtUser | null
  loading: boolean
  signOut: () => Promise<void>
  signUp: (email: string, password: string, fullName?: string, phoneNumber?: string, address?: string) => Promise<JwtUser | null>
  login: (email: string, password: string) => Promise<JwtUser | null>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  signUp: async () => null,
  login: async () => null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JwtUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user from JWT on mount
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null
    if (token) {
      api.get('/profile')
        .then(res => {
          if (res.data?.success && res.data?.data) {
            setUser(res.data.data);
          } else {
            setUser(null);
          }
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // Log user setiap kali state user berubah
  useEffect(() => {
    console.log("user state changed:", user);
  }, [user])

  // Register user
  const signUp = async (email: string, password: string, fullName?: string, phoneNumber?: string, address?: string) => {
    const res = await api.post('/auth/register', {
      email,
      password,
      name: fullName,
      phoneNumber,
      address,
    })
    if (res.data?.success && res.data?.data) {
      // Jangan simpan token/user ke localStorage/state saat register
      return res.data.data // hanya return data user
    }
    return null
  }

  // Login user
  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    if (res.data?.success && res.data?.data?.token) {
      localStorage.setItem('jwt', res.data.data.token)
      // Ambil profile user setelah login
      try {
        const profileRes = await api.get('/profile');
        if (profileRes.data?.success && profileRes.data?.data) {
          setUser(profileRes.data.data);
          return profileRes.data.data;
        }
      } catch {
        setUser(null);
        return null;
      }
    }
    setUser(null)
    return null
  }

  // Logout user
  const signOut = async () => {
    localStorage.removeItem('jwt')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signUp, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
