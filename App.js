import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Add from "./components/Add";
import Notes from "./components/Notes"
import Categories from "./components/Categories"
import { KeyProvider } from "./KeyContext";
import Edit from './components/Edit';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            <DrawerItem label="Notes" onPress={() => props.navigation.navigate("Notes")} />
            <DrawerItem label="Categories" onPress={() => props.navigation.navigate("Categories")} />
            <DrawerItem label="Add" onPress={() => props.navigation.navigate("Add")} />
            <DrawerItem label="Info" onPress={() => alert('Wersja 2.0')} />
        </DrawerContentScrollView>
    );
}

export default function App() {
    return (
        <KeyProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    <Drawer.Screen name="Notes" component={Notes} />
                    <Drawer.Screen name="Categories" component={Categories} />
                    <Drawer.Screen name="Add" component={Add} />
                    <Drawer.Screen name="Edit" component={Edit} />
                </Drawer.Navigator>
            </NavigationContainer>
        </KeyProvider>
    );
}
