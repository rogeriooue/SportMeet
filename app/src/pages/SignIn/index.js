import React from 'react';
import Axios from "axios";
import * as Keychain from 'react-native-keychain';

import {
    View,
    Text,
    Platform
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
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSignIn = async () => {
        setLoading(true);
        setErrorMessage('');
        setMessage('');

        try {
            const response = await Axios.post('http://192.168.0.14:8080/api/user/login', {
                email: email,
                password: password
            });

            if (response.status !== 200) {
                throw new Error('Autentication Failed');
            }

            const user = response.data.user;
            const token = response.data.token;
            const message = response.data.message;

            await Keychain.setGenericPassword('token', token);

            // navigation.navigate('Home'); //  Home or Menu screen is not created yet.

            setMessage(message);
            console.log(message);

        } catch (error) {
            setErrorMessage('Failed to sign in. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
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
                        value={email}
                        onChangeText={setEmail}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />

                    <Button onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Button>
                </AreaInput>

                <Link onPress={() => navigation.navigate('Forgot Password')}>
                    <Linktext>Forgot my Password</Linktext>
                </Link>

                {loading && <Spinner />}
                {errorMessage && <Error>{errorMessage}</Error>}
                {message && <Text>{message}</Text>}

                <SubmitButton activeOpacity={0.7} onPress={handleSignIn}>
                    <SubmitText>Login</SubmitText>
                </SubmitButton>

                <Link onPress={() => navigation.navigate('Sign Up')}>
                    <Linktext>Create your Account</Linktext>
                </Link>
            </Container>
        </Background>
    )
}