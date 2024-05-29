import React, { createContext, useState } from "react";
//import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const navigation = useNavigation();

    const [user, setUser] = useState({
        nome: 'Albert Leme'
    });


    async function signUp(email, password, nome) {

        try {
            const response = await api.post('/users', {
                name: nome,
                password: password,
                email: email,
            })

            navigation.goBack();

        } catch (err) {
            console.group('Erro ao cadastrar: ', err)
        }

    }

    /*
    async function signOut(){
        await AsyncStorage.clear()
        .then(()=> {
            setUser(null);
        })
    }
    */

    return (
        <AuthContext.Provider value={{ user, signUp/*, SignOut */}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;