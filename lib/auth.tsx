"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface User {
  id: string
  email: string
  role: string
  name: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token on initial load
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user
      // Optionally get token
      const token = await firebaseUser.getIdToken()

      // You may want to fetch custom claims or user profile from your DB here
      // For now, we'll use email and uid as user info
      const userObj = {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        role: "faculty", // You may want to fetch this from your DB
        name: firebaseUser.displayName || firebaseUser.email || "",
      }
      setUser(userObj)
      setToken(token)
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userObj))
      router.push("/dashboard")
      return { success: true }
    } catch (error: any) {
      let errorMsg = "Login failed"
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMsg = "Invalid email or password"
      } else if (error.message) {
        errorMsg = error.message
      }
      console.error("Login error:", error)
      return {
        success: false,
        error: errorMsg,
      }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();
      const userObj = {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        role: "faculty", // You may want to fetch this from your DB
        name: firebaseUser.displayName || firebaseUser.email || "",
      };
      setUser(userObj);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));
      return { success: true };
    } catch (error: any) {
      let errorMsg = "Google sign-in failed";
      if (error.message) {
        errorMsg = error.message;
      }
      console.error("Google login error:", error);
      return {
        success: false,
        error: errorMsg,
      };
    }
  };

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
