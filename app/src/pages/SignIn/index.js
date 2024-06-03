import React, { useState, useContext } from 'react';
import Axios from 'axios';
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
    Linktext
} from './styles';


export default function SignIn() {
    const navigation = useNavigation();

    const urlSignIn = `${BASE_URL}:${PORT}${ENDPOINT_SIGNIN}`;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { token, setToken } = useContext(AuthContext);
    const { name, setName } = useContext(AuthContext);

    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };

    const onChangePasswordHandler = (password) => {
        setPassword(password);
    };


    const onSubmitFormHandler = async (event) => {

        setLoading(true);

        try {
            const response = await Axios.post(urlSignIn, {
                email: email,
                password: password
            });

            if (response.status === 200) {
                setLoading(false);

                const { user, token, message } = response.data;

                alert(`Status: ${response.status}, Message: ${response.data.message}`);

                setEmail('');
                setPassword('');

                setName(user.name);
                setToken(token);

                console.log(message);


            } else {
                setLoading(false);
                throw new Error(`User Sign In Failed: ${response.status}, ${response.data.message}`);
            }

        } catch (error) {
            setLoading(false);
            if (error.response) {
                alert(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
                console.error(error);
            } else {
                alert(`Failed to Sign In. Please try again. ${error}`);
            }
            console.error(error);

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

                    {loading && <ActivityIndicator size="large" color="#0000ff" />}

                    <SubmitButton activeOpacity={0.7} onPress={onSubmitFormHandler}>
                        <SubmitText>Sign In</SubmitText>
                    </SubmitButton>

                    <Link onPress={() => navigation.navigate('Sign Up')}>
                        <Linktext>Create your Account</Linktext>
                    </Link>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}
