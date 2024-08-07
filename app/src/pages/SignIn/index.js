import React, { useState, useCallback, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import {
    BASE_URL,
    PORT,
    ENDPOINT_SIGNIN
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
    Logo,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText
} from './styles';


export default function SignIn() {
    const navigation = useNavigation();

    const urlSignIn = `${BASE_URL}:${PORT}${ENDPOINT_SIGNIN}`;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { token, setToken } = useContext(AuthContext);
    const { name, setName } = useContext(AuthContext);

    const handleEmail = useCallback((email) => {
        setEmail(email);
    }, []);

    const handlePassword = useCallback((password) => {
        setPassword(password);
    }, []);

    const onSubmitSignInHandler = async (event) => {

        setLoading(true);

        try {
            const response = await fetch(urlSignIn, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                const { user, token, message } = await response.json();

                alert(`Status: ${response.status}, Message: ${message}`);

                setEmail('');
                setPassword('');

                setName(user.name);
                setToken(token);

                console.log(message);

            } else {
                const { message } = await response.json();
                throw new Error(`Status: ${response.status}, ${message}`);
            }

        } catch (error) {
            if (error instanceof TypeError || error instanceof SyntaxError) {
                alert(`Failed to Sign In. Please check your network connection and try again. ${error.message}`);
            } else {
                alert(`Failed to Sign In. Please try again. ${error.message}`);
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
                    <Logo
                        source={require('../../assets/logo.png')}
                    />

                    <AreaInput>
                        <Input
                            placeholder='E-mail'
                            value={email}
                            onChangeText={handleEmail}
                            keyboardType='email-address'
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder='Password'
                            autoCapitalize='none'
                            value={password}
                            secureTextEntry={true}
                            onChangeText={handlePassword}
                        />
                    </AreaInput>

                    <Link onPress={() => navigation.navigate('Forgot Password')}>
                        <LinkText>Forgot my Password</LinkText>
                    </Link>

                    {loading && <ActivityIndicator size='large' color='#0000ff' />}

                    <SubmitButton activeOpacity={0.8} onPress={onSubmitSignInHandler}>
                        <SubmitText>Sign In</SubmitText>
                    </SubmitButton>

                    <Link onPress={() => navigation.navigate('Sign Up')}>
                        <LinkText>Create your Account</LinkText>
                    </Link>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}
