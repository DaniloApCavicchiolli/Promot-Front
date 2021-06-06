import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import { Avatar, Caption, TextInput, FAB, Button, HelperText, Checkbox, ProgressBar, Snackbar, withTheme } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AdicionaProduto({navigation, route, theme}){
    const { colors } = theme

    const [nome, setNome] = useState('')
    return(
        <>
        <Header titulo="Cadastro de Produtos" back={true} navigation={navigation} />
        <View style={{flex: 1, backgroundColor: colors.background, paddingHorizontal: 24, paddingVertical: 8}}>
        <Caption style={{color: colors.text, fontSize: 20, marginBottom: 32}}>Informações do Produto</Caption>
        <TextInput
          label='Nome do Produto'
          name="nome"
          value={nome}
          mode='outlined'
          onChangeText={setNome}
        />
        </View>
        </>
    )
}

export default withTheme(AdicionaProduto)