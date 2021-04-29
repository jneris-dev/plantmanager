import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import colors from '../styles/colors';

import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator tabBarOptions={{
            activeTintColor: colors.green,
            inactiveTintColor: colors.heading,
            labelPosition: 'beside-icon',
            style: {
                height: 70,
            }
        }}>
            <AppTab.Screen
                name="Nova Planta"
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <Ionicons
                            name="add"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <AppTab.Screen
                name="Minhas Plantas"
                component={MyPlants}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <Ionicons
                            name="leaf"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;