import React from 'react';
import { Container, Message, Name, NewLink, LogoutButton, LogoutText, NewText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth';
import SignIn from '../SignIn';


export default function Profile() {

    const navigation = useNavigation();
    const { signOut, name } = useContext(AuthContext);

    return (
        <Container>
            <Message>
                Welcome!
            </Message>

            <Name numberOfLines={1}>
                {name}
            </Name>

            <NewLink>
                <NewText>
                    Sign Up
                </NewText>
            </NewLink>

            <LogoutButton onPress={async () => { await signOut() }}>
                <LogoutText>
                    Sign Out
                </LogoutText>
            </LogoutButton>
        </Container>
    )
}