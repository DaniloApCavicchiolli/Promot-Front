import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

import Home from '../screens/Home'
import Configuracoes from '../screens/Configuracoes'

export default function Tabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Inicio" component={Home} 
            options={{tabBarIcon: ()=> (
                <FontAwesome5 name="user" size={24} color="black" />)}} 
            />
            <Tab.Screen name="Configurações" component={Configuracoes} 
            options={{tabBarIcon: ()=> (
                <FontAwesome5 name="cogs" size={24} color="black" />)}} 
            />
        </Tab.Navigator>
    )
}