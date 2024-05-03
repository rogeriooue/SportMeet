import React from "react";
import Axios from "axios";

import { useState } from 'react';

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

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [recoverCode, setRecoverCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const onChangeEmailHandler = (email) => {
        setEmail(email);
    };

    const onChangeRecoverCodeHandler = (recoverCode) => {
        setRecoverCode(recoverCode);
    };

    const onChangeNewPasswordHandler = (newPassword) => {
        setNewPassword(newPassword);
    };

    const onChangeConfirmNewPasswordHandler = (confirmNewPassword) => {
        setConfirmNewPassword(confirmNewPassword);
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

                    <SubmitButton>
                        <SubmitText>Send Recover Code</SubmitText>
                    </SubmitButton>

                    <AreaInput>
                        <Input
                            placeholder="Recover Code"
                            autoCapitalize="none"
                            value={recoverCode}
                            onChangeText={onChangeRecoverCodeHandler}
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

                    <SubmitButton>
                        <SubmitText>Update Password</SubmitText>
                    </SubmitButton>

                </Container>
            </Background>
        </TouchableWithoutFeedback>
    )
}