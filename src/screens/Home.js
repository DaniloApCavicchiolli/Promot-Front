import React from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { withTheme, List } from 'react-native-paper'
import Header from '../components/Header'

function Home({navigation, theme}){
    const { colors } = theme
    const opcoes = [
        {id: 1, nome:'Categorias', descricao:'Categorias de Produtos',
        icone: 'blur', menu: 'ListaCategorias'},
        {id: 2, nome:'Produtos', descricao:'Lista de Produtos',
        icone:'cog', menu:'Produtos'}
    ]

    return(
        <>
            <Header titulo="Área Administrativa" subtitulo="Promot" back={false} />
            <View style={{backgroundColor: colors.surface, paddingHorizontal: 10, paddingVertical: 20, flex: 1}}>
               <List.Subheader>Selecione um das opcoes:</List.Subheader>
               <FlatList data={opcoes} renderItem={({item}) => (
                   <View style={{
                    flex: 1, justifyContent: 'center', backgroundColor: colors.background,
                    borderRadius: 20, margin: 8 }}
                    >
                    <List.Item 
                        title={item.nome}
                        style={{backgroundColor: colors.background}}
                        titleStyle={{fontSize: 20}}
                        description={item.descricao}
                        descriptionStyle={{marginBottom: 5}}
                        onPress={()=> navigation.navigate(item.menu)}
                        left={props => <List.Icon {...props} icon={item.icone} />}
                    />
                   </View>
                )}
                    keyExtractor={item => item.id.toString()} 
                />
            </View>
        </>
    )
} 

export default withTheme(Home)