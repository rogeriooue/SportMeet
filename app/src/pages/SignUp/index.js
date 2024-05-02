import React from "react";
import Axios from "axios";

import {
    useContext,
    useState,
    useEffect
} from 'react';

import {
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Spinner
} from 'react-native';

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';

import { AuthContext } from "../../contexts/auth";

export default function SignUp() {

    const { user } = useContext(AuthContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [] = useState();

    function handleSignUp() {
        setName(name);
        setPassword(password);
        setConfirmPassword(confirmPassword);
        setEmail(email);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Background>
                <Container
                    behavior={Platform.OS === 'ios' ? 'padding' : ''}
                    enabled
                >
                    <AreaInput>
                        <Input
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="E-mail"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Password"
                            value={password}
                            autoCapitalize="none"
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            autoCapitalize="none"
                            secureTextEntry={true}
                        />
                    </AreaInput>

                    <SubmitButton onPress={handleSignUp}>
                        <SubmitText>Sign UP</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}