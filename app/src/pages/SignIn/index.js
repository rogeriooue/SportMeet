import React from 'react';
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';

import {
    View,
    Spinner,
    Button,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import {
    Background,
    Container,
    Logo,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Link,
    Linktext
} from './styles';

import { useNavigation } from '@react-navigation/native';
// import { set } from 'mongoose'; // It´s not used yet.

export default function SignIn() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };

    const onChangePasswordHandler = (password) => {
        setPassword(password);
    };

    const onSubmitFormHandler = async (event) => {
        setLoading(true);

        try {
            const response = await Axios.post('http://192.168.0.14:8080/api/user/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                const { user, token, message } = response.data;

                await AsyncStorage.setItem('token', token);

                alert(`Status: ${response.status}, Message: ${response.data.message}`);
                setLoading(false);
                setEmail('');
                setPassword('');
                console.log(message);
                // navigation.navigate('Home'); //  Home or Menu screen is not created yet.

            } else {
                throw new Error(`Autentication Failed: ${response.status}, ${response.data.message}`);
            }

        } catch (error) {
            if (error.response) {
                alert(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
                console.error(error);
                setLoading(false);
            } else {
                alert(`Failed to sign in. Please try again. ${error}`);
            }
            console.error(error);
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
                    <Logo
                        source={require('../../assets/logo.png')}
                    />

                    <AreaInput>
                        <Input
                            placeholder="E-mail"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={onChangeEmailHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Password"
                            autoCapitalize="none"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={onChangePasswordHandler}
                        />
                    </AreaInput>

                    <Link onPress={() => navigation.navigate('Forgot Password')}>
                        <Linktext>Forgot my Password</Linktext>
                    </Link>

                    {loading && <Spinner />}

                    <SubmitButton activeOpacity={0.7} onPress={onSubmitFormHandler}>
                        <SubmitText>Login</SubmitText>
                    </SubmitButton>

                    <Link onPress={() => navigation.navigate('Sign Up')}>
                        <Linktext>Create your Account</Linktext>
                    </Link>
                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}