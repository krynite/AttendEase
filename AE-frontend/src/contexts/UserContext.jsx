import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
    try {
        const token = localStorage.getItem('token');
        // console.log('Token from storage:', token);

        if (!token) return null;

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        // console.log(`Decoded Token: ${decodedToken.payload}`)
        return decodedToken.payload || decodedToken;
    } catch (error) {
        console.error("Error getting user from token:", error);
        localStorage.removeItem("token");
        return null;
    }
};

function UserProvider({ children }) {
    const [user, setUser] = useState(getUserFromToken());

    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
