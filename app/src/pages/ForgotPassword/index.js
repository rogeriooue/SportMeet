import React from "react";
import Axios from "axios";

import {
    BASE_URL,
    PORT,
    ENDPOINT_FORGOT_PASSWORD,
    ENDPOINT_NEW_PASSWORD
} from '@env';

import { useNavigation } from '@react-navigation/native';

import { useState } from 'react';

import {
    ActivityIndicator,
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

export default function ForgotPassword() {
    const navigation = useNavigation();

    const urlForgotPass = `${BASE_URL}:${PORT}${ENDPOINT_FORGOT_PASSWORD}`;
    const urlNewPass = `${BASE_URL}:${PORT}${ENDPOINT_NEW_PASSWORD}`;

    const [email, setEmail] = useState('');
    const [recoveryCode, setRecoveryCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };

    const onChangeRecoveryCodeHandler = (recoveryCode) => {
        setRecoveryCode(recoveryCode);
    };

    const onChangeNewPasswordHandler = (newPassword) => {
        setNewPassword(newPassword);
    };

    const onChangeConfirmNewPasswordHandler = (confirmNewPassword) => {
        setConfirmNewPassword(confirmNewPassword);
    };

    const onSubmitRecoveryCodeHandler = async (event) => {

        setLoading(true);

        try {
            const response = await Axios.post(urlForgotPass, {
                email: email
            });

            if (response.status === 200) {
                setLoading(false);

                const { message } = response.data;

                console.log(message);

                alert(`Status: ${response.status}, Message: ${response.data.message}`);

            } else {
                setLoading(false);
                throw new Error(`Forgot Password Failed: Status: ${response.status}, Message: ${response.data.message}`);
            }

        } catch (error) {
            setLoading(false);
            if (error.response) {
                alert(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
                console.error(error);
            } else {
                alert(`Forgot Password Failed. Please try again. ${error}`);
            }
            console.error(error);
        }
    };

    const onSubmitUpdatePasswordHandler = async (event) => {

        setLoading(true);

        try {
            const response = await Axios.put(urlNewPass, {
                email: email,
                recoveryCode: recoveryCode,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword
            });

            if (response.status === 200) {
                setLoading(false);

                const { message } = response.data;

                alert(`Status: ${response.status}, Message: ${response.data.message}`);

                console.log(message);

                navigation.navigate('Sign In');

            } else {
                setLoading(false);
                throw new Error(`Update Password Failed: Status: ${response.status}, Message: ${response.data.message}`);
            }

        } catch (error) {
            setLoading(false);
            if (error.response) {
                alert(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
                console.error(error);
            } else {
                alert(`Update Password Failed. Please try again. ${error}`);
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
                            placeholder="E-mail"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={onChangeEmailHandler}
                        />
                    </AreaInput>

                    {loading && <ActivityIndicator size="large" color="#0000ff" />}

                    <SubmitButton onPress={onSubmitRecoveryCodeHandler}>
                        <SubmitText>Send Recovery Code</SubmitText>
                    </SubmitButton>

                    <AreaInput>
                        <Input
                            placeholder="Recovery Code"
                            autoCapitalize="none"
                            value={recoveryCode}
                            onChangeText={onChangeRecoveryCodeHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="New Password"
                            autoCapitalize="none"
                            value={newPassword}
                            secureTextEntry={true}
                            onChangeText={onChangeNewPasswordHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Confirm New Password"
                            autoCapitalize="none"
                            value={confirmNewPassword}
                            secureTextEntry={true}
                            onChangeText={onChangeConfirmNewPasswordHandler}
                        />
                    </AreaInput>

                    <SubmitButton onPress={onSubmitUpdatePasswordHandler}>
                        <SubmitText>Update Password</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}