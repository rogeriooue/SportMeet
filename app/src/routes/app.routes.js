import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/Header/CustomDrawer";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateEvent from "../pages/CreateEvent";

const AppDrawer = createDrawerNavigator();

function AppRoutes({title}) {
    return (
        <AppDrawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerTitle: {title},
                headerStyle: {
                    backgroundColor: '#3B3DBF',
                    borderBottomWidth: 1,
                    borderBottomColor: '#00B94A',
                },
                headerTintColor: '#FFF',
                headerBackTitle: 'Return',
                headerBackTitleVisible: true,
                drawerStyle: {
                    backgroundColor: '#FFF'
                },
                drawerActiveBackgroundColor: '#3B3DBF',
                drawerActiveTintColor: '#FFF',

                drawerInactiveBackgroundColor: '#F0F2FF',
                drawerInactiveTintColor: '#121212'
            }}>
            <AppDrawer.Screen
                name="Menu Inicial"
                component={Home}
            />
            <AppDrawer.Screen
                name="Perfil"
                component={Profile}
            />
            <AppDrawer.Screen
                name="Criar Evento"
                component={CreateEvent}
            />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;