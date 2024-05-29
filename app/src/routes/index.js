import React from "react";
import { View, ActivityIndicator } from 'react-native';
import { useState, useContext } from "react";

import { AuthContext } from "../contexts/auth";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

function Routes() {
    //const loading = false;
    const signed = true
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;