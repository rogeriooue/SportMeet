import React from "react";
import { Container, Message, Name, NewLink, LogoutButton, LogoutText, NewText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import SignIn from "../SignIn";

export default function Profile(){
    const navigation = useNavigation();
    const {} = useContext(AuthContext);
    return(
        <Container>
            <Message>
                Bem-Vindo de Volta!
            </Message>

            <Name numberOfLines={1}>
                Albert Leme de Brito
            </Name>

            <NewLink>
                <NewText>
                    Fazer Registro
                </NewText>
            </NewLink>

            <LogoutButton /*onPress={() => navigation.navigate('Sign Up')}*/>
                <LogoutText>
                    Sair
                </LogoutText>
            </LogoutButton>
        </Container>
    )
}