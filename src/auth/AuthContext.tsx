import { createContext, useContext, useState, type ReactNode } from "react";
import { loginUser, registerUser, type User } from "../utils/api";




interface AuthContextType {
    user : User  | null;
   login : (email : string , password : string) => Promise<void>
   register: (email: string , password : string) => Promise<void>
   logout : () => void 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(() => {
       const  storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null ;
    })

  const login = async  (email : string , password : string ) => {
         try {
      const loggedUser = await loginUser(email, password);
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }

  }

  const register = async (email : string , password : string ) => {
    try {
      const newUser = await registerUser(email, password);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser)); 
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }


  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }
    return (
       <AuthContext.Provider value={{login , user , register , logout }}>
        {children}
       </AuthContext.Provider>
    )
}

export const  useAuth = ()=> {
    const context = useContext(AuthContext)
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}