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
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeNameHandler = (name) => {
        setName(name);
    };

    const onChangeSurnameHandler = (surname) => {
        setSurname(surname);
    }

    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };

    const onChangePasswordHandler = (password) => {
        setPassword(password);
    };

    const onChangeConfirmPasswordHandler = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
    };

    const onSubmitFormHandler = async (event) => {
        setLoading(true);
    };

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
                            onChangeText={onChangeNameHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Surname"
                            value={surname}
                            onChangeText={onChangeSurnameHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="E-mail"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={onChangeEmailHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Password"
                            value={password}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={onChangePasswordHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={onChangeConfirmPasswordHandler}
                        />
                    </AreaInput>

                    <SubmitButton onPress={onSubmitFormHandler}>
                        <SubmitText>Sign Up</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}