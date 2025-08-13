'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createContext, useContext, useEffect, useState } from 'react'

const SupabaseContext = createContext<any>(null)

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within SupabaseProvider')
  }
  return context
}

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient())
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const value = {
    supabase,
    user,
    loading,
    signIn: (email: string, password: string) => 
      supabase.auth.signInWithPassword({ email, password }),
    signUp: (email: string, password: string) => 
      supabase.auth.signUp({ email, password }),
    signOut: () => supabase.auth.signOut(),
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}