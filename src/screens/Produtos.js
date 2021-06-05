import React, {useState, useEffect} from 'react'
import { View,  ActivityIndicator, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { withTheme, List, Avatar, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'
import ListaProduto from './ListaProduto'

function Produtos({navigation, theme}){
    const { colors } = theme
    const [produtos, setProdutos] = useState([]) //hook para receber os produtos
    const [carregandoProdutos, setCarregandoProdutos] = useState(false)// para mostrar activity indicator
    const [refreshing, setRefreshing] = useState(false)

    //mostrando as categorias
    useEffect(()=>{
        obterProdutos()
    },[])

    async function obterProdutos(){
        setCarregandoProdutos(true)
            let url = `${BACKEND}/produtos`
            await fetch(url)
            .then(response => response.json())
            .then(data => {
                setProdutos(data)
                //console.log('Categorias obtidas com sucesso!')
            })
            .catch(function (error) {
                console.error(`Houve um problema ao obter os produtos: ${error.message}`)
            })
            setCarregandoProdutos(false)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
            try{
                await obterProdutos()
            } catch (error){
                console.error(error)
            }
        setRefreshing(false)
    },[refreshing])

    return(
        <>
        <Header titulo="Produtos" subtitulo="Lista de Produtos"
            back={true} navigation={navigation} />
        <View style={{backgroundColor: colors.surface, paddingHorizontal: 10, paddingVertical: 20, flex: 1}}>
            <List.Subheader>
                <Avatar.Icon size={24} icon="refresh" /> Para atualizar os dados
            </List.Subheader>
            {carregandoProdutos && <ActivityIndicator sizee="Large" color={colors.primary} />}
            {produtos.length === 0 && !carregandoProdutos ?
            (
                <View style={styles.tituloAviso}>
                    <Text style={styles.titulo}>Ainda não há nehum produto cadastrado.</Text>
                </View>
            ) : (
                <FlatList
                    data={produtos}
                    renderItem={({item}) => (
                        <ListaProduto data={item} navigation={navigation} />
                    )}
                    keyExtractor={item => item._id.toString()}
                    refreshControl={<RefreshControl 
                                        refreshing={refreshing}
                                        onRefresh={onRefresh} />
                                    }
                />
                )
            }
            <FAB
                    style={styles.fab}
                    icon='plus'
                    label=''
                    onPress={() => navigation.navigate('AdicionaProduto')}
                />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    tituloAviso: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    titulo: {
        fontSize: 20
    }
})

export default withTheme(Produtos)