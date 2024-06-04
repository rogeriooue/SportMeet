import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../contexts/auth";

import {
    BASE_URL,
    PORT,
    ENDPOINT_SIGNUP
} from '@env';

import {
    useContext,
    useState,
    useEffect
} from 'react';

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
                setLoading(false);

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
                setLoading(false);
                throw new Error(`User Sign Up Failed: ${response.status}, ${response.statusText}`);
            }

        } catch (error) {
            setLoading(false);
            if (error instanceof TypeError || error instanceof SyntaxError) {
                alert(`Failed to Sign Up. Please check your network connection and try again. ${error}`);
            } else {
                alert(`Failed to Sign Up. Please try again. ${error}`);
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

                    {loading && <ActivityIndicator size="large" color="#0000ff" />}

                    <SubmitButton onPress={onSubmitFormHandler}>
                        <SubmitText>Sign Up</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}