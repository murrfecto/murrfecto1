import axios from "axios";
import {createContext, useState, useEffect} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            axios.get('https://murrfecto1.vercel.app/api/v1/profile').then(({data}) => {
                setUser(data);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
