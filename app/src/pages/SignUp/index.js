import React, {useContext, useState, useEffect} from "react";
import {Platform} from 'react-native';

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';

import { AuthContext } from "../../contexts/auth";

export default function SignUp(){

    const{user} = useContext(AuthContext)
    const[nome, setNome]=useState('');
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const [] = useState();
    
    function handleSignUp(){
        setNome(nome);
        setPassword(password);
        setEmail(email);
        console.log(user.nome);
        console.log(nome);
        console.log(email);
        console.log(password);
    }

    return(
        <Background>
            <Container
                behavior={Platform.OS ==='ios' ? 'padding': ''}
                enabled
            >
                <AreaInput>
                    <Input
                        placeholder="Nome"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Confirmar Senha"
                        secureTextEntry={true}
                    />
                </AreaInput>
                <SubmitButton onPress={handleSignUp}>
                    <SubmitText>Cadastrar</SubmitText>
                </SubmitButton>
            </Container>
        </Background>
    )
}