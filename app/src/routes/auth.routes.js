import React from "react";
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from "../pages/ForgotPassword";

const AuthStack = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
        >
            <AuthStack.Screen
                name="Sign In"
                component={SignIn}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />

            <AuthStack.Screen
                name="Sign Up"
                component={SignUp}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#3B3DBF',
                        borderBottomWidth: 1,
                        borderBottomColor: '#00B94A',
                    },
                    headerTintColor: '#FFF',
                    headerBackTitle: 'Return',
                    headerBackTitleVisible: true,
                }}
            />

            <AuthStack.Screen
                name="Forgot Password"
                component={ForgotPassword}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#3B3DBF',
                        borderBottomWidth: 1,
                        borderBottomColor: '#00B94A',
                    },
                    headerTintColor: '#FFF',
                    headerBackTitle: 'Return',
                    headerBackTitleVisible: true,
                }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;