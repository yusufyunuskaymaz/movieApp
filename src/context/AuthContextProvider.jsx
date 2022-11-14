import React, { createContext, useContext, useEffect, useState } from 'react'
import { userObserver } from '../auth/firebase';

export const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}


const AuthContextProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(false)
  console.log(currentUser)

  useEffect(() => {
    userObserver(setCurrentUser); 
  }, []);
  return (
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider


















