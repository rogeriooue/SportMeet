import React from "react";
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from "../pages/ForgotPassword";

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Sign In"
                component={SignIn}
                options={{
                    headerShown: false
                }}
            />

            <AuthStack.Screen
                name="Sign Up"
                component={SignUp}
                options={{
                    headerStyle: {
                        backgroundColor: '#3B3DBF',
                        borderBottomWidth: 1,
                        borderBottomColor: '#00B94A',
                    },
                    headerTintColor: '#FFF',
                    headerTitle: 'Return',
                    headerBackTitleVisible: false,
                }}
            />

            <AuthStack.Screen
                name="Forgot Password"
                component={ForgotPassword}
                options={{
                    headerStyle: {
                        backgroundColor: '#3B3DBF',
                        borderBottomWidth: 1,
                        borderBottomColor: '#00B94A',
                    },
                    headerTintColor: '#FFF',
                    headerTitle: 'Return',
                    headerBackTitleVisible: false,
                }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;