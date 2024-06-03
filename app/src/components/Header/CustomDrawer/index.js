import React, { useContext } from 'react';
import { View, Text, Image, LogBox } from 'react-native';

import { AuthContext } from '../../../contexts/auth';

import { DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';


export default function CustomDrawer(props) {
    const { name } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: "25px" }}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={{
                        width: 200,
                        height: 200,
                        resizeMode: "contain"
                    }}
                />
                <Text style={{ fontSize: 18, marginTop: 14 }}>
                    Welcome
                </Text>
                <Text
                    numberOfLines={1}
                    style={{ fontSize: 17, marginBottom: 14, fontWeight: "bold", marginBottom: 20, paddingHorizontal: 20 }}>
                    {name}
                </Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

