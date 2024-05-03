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

    const onButtonPress = () => {
        setLoading(true);
        onSubmitFormHandler();
    };

    const onSubmitFormHandler = async (event) => {
        setLoading(true);

        try {
            const response = await Axios.post('http://192.168.0.14:8080/api/user/account', {
                name: name,
                surname: surname,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            if (response.status === 200) {
                const { user, message } = response.data;

                alert(`Status: ${response.status}, Message: ${response.data.message}`);
                setLoading(false);
                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                console.log(message);

                navigation.navigate('SignIn');

            } else {
                throw new Error(`User Sign Up Failed: ${response.status}, ${response.data.message}`);
            }

        } catch (error) {
            if (error.response) {
                alert(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
                console.error(error);
                setLoading(false);
            } else {
                alert(`Failed to Sign Up. Please try again. ${error}`);
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

                    {loading && <Spinner />}

                    <SubmitButton onPress={onButtonPress}>
                        <SubmitText>Sign Up</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}