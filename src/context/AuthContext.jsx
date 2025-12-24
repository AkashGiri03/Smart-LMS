import { createContext , useContext , useState , useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();
const backendURL = 'http://localhost:3002/';

export const AuthProvider = ({ children }) =>{
    const [user , setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem('token') || null;
        } catch (e) {
            return null;
        }
    });

    //login user
    const login = async ( email , password) =>{
        try {
                const { data } = await axios.post(backendURL + "api/auth/login" , {email , password});
                //save into state
                console.log("token data",data);
                setUser(data.user);
                if (data.token) {
                    setToken(data.token);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                    localStorage.setItem('token', data.token);
                }
                localStorage.setItem('user',JSON.stringify(data.user));//storing user info in local storage
        } catch (error){
            console.log("login failed",error);
        }
    }

    //logout
    const logout = () =>{
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            try {
                delete axios.defaults.headers.common["Authorization"];
            } catch (e) {}
    }

        // ensure axios header is set when provider mounts and token exists
        useEffect(() => {
            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        }, [token]);


    return <AuthContext.Provider value={{user , login , logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);