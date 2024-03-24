import * as React from "react";

interface AuthContextType {
    tipoUser: string;
    setTipoUsuario: (tipo: string) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    tipoUser: "",
    setTipoUsuario: () => {}
});

export const AuthProvider: React.FC = ({ children }: any) => {
    const [tipoUser, setTipoUsuario] = React.useState("test");


    return (
        <AuthContext.Provider value={{ tipoUser, setTipoUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return React.useContext(AuthContext);
}
