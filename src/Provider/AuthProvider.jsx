import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config.js"
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";




export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);


    ///create user

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }



    ///sign in user
    const signInuser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    /// logout
    const logOut = () => {
        return signOut(auth);
    }

    /// authInfo
    const authInfo = { user, createUser, signInuser, logOut }


    // axios PUblic
    const axiosPublic = useAxiosPublic();

    /// observe auth state change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("Current user : ", currentUser)
        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

