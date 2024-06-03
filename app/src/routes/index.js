import React, { useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';


function Routes() {
    const { token } = useContext(AuthContext);

    return (
        token ? < AppRoutes /> : < AuthRoutes />
    )
}


export default Routes;