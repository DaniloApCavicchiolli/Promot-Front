import React from 'react'
import { View } from 'react-native'
import { withTheme, List, Switch } from 'react-native-paper'
import Header from '../components/Header'

function Produtos({navigation, theme}){
    const { colors } = theme
    return(
        <>
         <Header titulo="Produtos" subtitulo="Lista de Produtos"
            back={true} navigation={navigation} />
             <View style={{backgroundColor: colors.surface, paddingHorizontal: 10, paddingVertical: 20, flex: 1}}>

             </View>
        </>
    )
}

export default withTheme(Produtos)