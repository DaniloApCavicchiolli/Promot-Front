import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from '../themes/ThemeProvider'

import Configuracoes from '../screens/Configuracoes'
import Tabs from './Tabs'
import Produtos from '../screens/Produtos'
import AdicionaProduto from '../screens/AdicionaProduto'

const Stack = createStackNavigator()

export default function(){
    const { tema } = React.useContext(AppContext)
    return(
        <NavigationContainer theme={tema}>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Home" component={Tabs} options={{headerShown: false}}/>
                <Stack.Screen name="Configuracoes" component={Configuracoes} options={{headerShown: false}}/>
                <Stack.Screen name="Produtos" component={Produtos} options={{headerShown: false}}/>
                <Stack.Screen name="AdicionaProduto" component={AdicionaProduto} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}