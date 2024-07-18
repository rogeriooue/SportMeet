import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    BASE_URL,
    PORT,
    ENDPOINT_FORGOT_PASSWORD,
    ENDPOINT_NEW_PASSWORD
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
            const response = await fetch(urlForgotPass, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const { message } = await response.json();

            if (response.ok) {

                console.log(message);

                alert(`Status: ${response.status}, Message: ${message}`);

            } else {
                throw new Error(`Status: ${response.status}, Message: ${message}`);
            }

        } catch (error) {
            if (error instanceof TypeError || error instanceof SyntaxError) {
                alert(`Forgot Password Failed. Please check your network connection and try again. ${error}`);
            } else {
                alert(`Forgot Password Failed. Please try again. ${error}`);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmitUpdatePasswordHandler = async (event) => {

        setLoading(true);

        try {
            const response = await fetch(urlNewPass, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    recoveryCode: recoveryCode,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                })
            });

            const { message } = await response.json();

            if (response.ok) {
                alert(`Status: ${response.status}, Message: ${message}`);
                console.log(message);
                navigation.navigate('Sign In');

            } else {
                throw new Error(`Status: ${response.status}, Message: ${message}`);
            }

        } catch (error) {
            if (error instanceof TypeError || error instanceof SyntaxError) {
                alert(`Update Password Failed. Please check your network connection and try again. ${error}`);
            } else {
                alert(`Update Password Failed. Please try again. ${error}`);
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
                            placeholder='E-mail'
                            autoCapitalize='none'
                            value={email}
                            onChangeText={onChangeEmailHandler}
                        />
                    </AreaInput>

                    {loading && <ActivityIndicator size='large' color='#0000ff' />}

                    <SubmitButton activeOpacity={0.8} onPress={onSubmitRecoveryCodeHandler}>
                        <SubmitText>Send Recovery Code</SubmitText>
                    </SubmitButton>

                    <AreaInput>
                        <Input
                            placeholder='Recovery Code'
                            autoCapitalize='none'
                            value={recoveryCode}
                            onChangeText={onChangeRecoveryCodeHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder='New Password'
                            autoCapitalize='none'
                            value={newPassword}
                            secureTextEntry={true}
                            onChangeText={onChangeNewPasswordHandler}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder='Confirm New Password'
                            autoCapitalize='none'
                            value={confirmNewPassword}
                            secureTextEntry={true}
                            onChangeText={onChangeConfirmNewPasswordHandler}
                        />
                    </AreaInput>

                    <SubmitButton activeOpacity={0.8} onPress={onSubmitUpdatePasswordHandler}>
                        <SubmitText>Update Password</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}