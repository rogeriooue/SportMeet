import React, { useContext, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../contexts/auth";

import {
    BASE_URL,
    PORT,
    ENDPOINT_SIGNUP
} from '@env';

import {
    ActivityIndicator,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';


export default function SignUp() {
    const navigation = useNavigation();

    const urlSignUp = `${BASE_URL}:${PORT}${ENDPOINT_SIGNUP}`;

    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleName = useCallback((name) => {
        setName(name);
    }, []);

    const handleSurname = useCallback((surname) => {
        setSurname(surname);
    }, []);

    const handleEmail = useCallback((email) => {
        setEmail(email);
    }, []);

    const handlePassword = useCallback((password) => {
        setPassword(password);
    }, []);

    const handleConfirmPassword = useCallback((confirmPassword) => {
        setConfirmPassword(confirmPassword);
    }, []);

    const onSubmitSignUpHandler = async (event) => {

        setLoading(true);

        try {
            const response = await fetch(urlSignUp, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                })
            });

            if (response.ok) {
                const { user, message } = await response.json();

                alert(`Status: ${response.status}, Message: ${message}`);

                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                console.log(message);

                navigation.navigate('Sign In');

            } else {
                const { message } = await response.json();
                throw new Error(`Status: ${response.status}, ${message}`);
            }

        } catch (error) {
            if (error instanceof TypeError || error instanceof SyntaxError) {
                alert(`Failed to Sign Up. Please check your network connection and try again. ${error.message}`);
            } else {
                alert(`Failed to Sign Up. Please try again. ${error.message}`);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                            placeholder='Name'
                            value={name}
                            onChangeText={handleName}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder='Surname'
                            value={surname}
                            onChangeText={handleSurname}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder='E-mail'
                            value={email}
                            autoCapitalize='none'
                            onChangeText={handleEmail}
                            keyboardType='email-address'
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder='Password'
                            value={password}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={handlePassword}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={handleConfirmPassword}
                        />
                    </AreaInput>

                    {loading && <ActivityIndicator size='large' color='#0000ff' />}

                    <SubmitButton activeOpacity={0.8} onPress={onSubmitSignUpHandler}>
                        <SubmitText>Sign Up</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}