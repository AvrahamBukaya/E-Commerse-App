import { createContext, useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, auth } from '../firebase/config'

const AuthContext = createContext();



function useAuth() {

    return useContext(AuthContext);

}

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {

        const unsubcribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsubcribe
    }, []);





    const value = {
        currentUser,
        signup
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>)
}

export { AuthProvider, useAuth };