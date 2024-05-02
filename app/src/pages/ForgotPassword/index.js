import React from "react";
import {Platform} from 'react-native';

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';

export default function ForgotPassword(){
    return(
        <Background>
            <Container
                behavior={Platform.OS ==='ios' ? 'padding': ''}
                enabled
            >
                <AreaInput>
                    <Input
                        placeholder="E-mail"
                    />
                </AreaInput>
                <SubmitButton>
                    <SubmitText>Enviar Código</SubmitText>
                </SubmitButton>
                <AreaInput>
                    <Input
                        placeholder="Código"
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Nova Senha"
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Confirmar Nova Senha"
                    />
                </AreaInput>
            </Container>
        </Background>
    )
}