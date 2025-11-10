import { createContext, useContext, useState, type ReactNode } from "react";
import { loginUser } from "../utils/api";


interface User {
    id: number ,
    email : string
}

interface AuthContextType {
    user : User  | null;
   login : (email : string , password : string) => void
   register: (email: string , password : string) => void 
   logout : () => void 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(() => {
       const  storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null ;
    })

  const login = async  (email : string , password : string ) => {
         const loggedUser = await loginUser(email , password);
         setUser(loggedUser)
         localStorage.setItem( "user" , JSON.stringify(loggedUser))

  }

  const register = async (email , password ) => {
    const newUser = await 
  }

    return (
       <AuthContext.Provider value={{login , user , }}>
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