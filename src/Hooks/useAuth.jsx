import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider.jsx";


const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;