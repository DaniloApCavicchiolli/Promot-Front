import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert} from 'react-native'
import {Caption, TextInput, FAB, HelperText, Checkbox, Snackbar, withTheme } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AdicionaProduto({navigation, route, theme}){
    const { colors } = theme
    // obtendo os dados da alteração via rota
    const { data } = route.params
    const [nome, setNome] = useState(data.nome)
    const [status, setStatus] = useState(data.status)
    const [valor, setValor] = useState(data.valor.toString())
    const [quantidade, setQuantidade] = useState(data.quantidade.toString())
    const [dataAbastecimento, setDataAbastecimento] = useState(data.data_abastecimento)
    const [dataVencimento, setDataVencimento] = useState(data.data_vencimento)
    
    const [salvandoProduto, setSalvandoProduto] = useState(false)
    const [erros, setErros] = useState({})
    const [aviso, setAviso] = useState('')

  const validaErrosProduto = () => {
    const novosErros = {}
    //Validação do Nome
    if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
    if (!valor || valor === '') novosErros.valor = 'O valor não pode ser vazio!'
    if (!quantidade || quantidade === '') novosErros.quantidade = 'A quantidade não pode ser vazio!'
    if (!dataAbastecimento || dataAbastecimento === '') novosErros.dataAbastecimento = 'A data do abastecimento não pode ser vazio!'
    if (!dataVencimento || dataVencimento === '') novosErros.dataVencimento = 'A data do vencimento não pode ser vazio!'
    return novosErros
  }

  async function salvaProduto() {
    const novosErros = validaErrosProduto()
    // Existe algum erro no array?
    if (Object.keys(novosErros).length > 0) {
      // Sim, temos erros!
      setErros(novosErros)
    } else {
      //Verificamos se o registro possui _id. Se não tiver, inserimos via POST(insert), senão alteramos via PUT(update)
      const metodo = data._id === null ? 'POST' : 'PUT'
      let statusProduto = (status === true || status === 'ativo') ? 'ativo' : 'inativo'
      let produto = { nome: nome, status: statusProduto, valor: valor, quantidade: quantidade, data_abastecimento: dataAbastecimento, data_vencimento: dataVencimento, _id: data._id }
      setSalvandoProduto(true)
      let url = `${BACKEND}/produtos`
      await fetch(url, {
        mode: 'cors',
        method: metodo,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      }).then(response => response.json())
        .then(data => {
          (data._id || data.message) ? setAviso('Registro salvo com sucesso!') : setAviso('')
          setNome('')
          setValor('')
          setQuantidade('')
          setDataAbastecimento('')
          setDataVencimento('')
          Alert.alert('Registro salvo com sucesso!')
        })
        .catch(function (error) {
          setAviso('Não foi possível salvar o registro')
          console.error('Houve um problema ao salvar o produto: ' + error.message);
        })
        setSalvandoProduto(false)
    }
  }

    return(
        <>
        <Header titulo="Cadastro de Produtos" back={true} navigation={navigation} />
        <View style={{flex: 1, backgroundColor: colors.background, paddingHorizontal: 24, paddingVertical: 8}}>
        <Caption style={{color: colors.text, fontSize: 20, marginBottom: 32}}>Informações do Produto</Caption>
        <TextInput label='Nome do Produto' name="nome" value={nome} mode='outlined' onChangeText={setNome} error={!!erros.nome}/>
        <TextInput label='Valor do Produto' name="valor" value={valor} mode='outlined' onChangeText={setValor} error={!!erros.valor}/>
        <TextInput label='Quantidade do Produto' name="quantidade" value={quantidade} mode='outlined' onChangeText={setQuantidade} error={!!erros.quantidade}/>
        <TextInput label='Data de abastecimento do Produto' name="dataAbastecimento" value={dataAbastecimento} mode='outlined' onChangeText={setDataAbastecimento} error={!!erros.dataAbastecimento}/>
        <TextInput label='Data vencimento do Produto' name="dataVencimento" value={dataVencimento} mode='outlined' onChangeText={setDataVencimento} error={!!erros.dataVencimento}/>

        <HelperText type="error" visible={!!erros.nome}> {erros.nome} </HelperText>
        <HelperText type="error" visible={!!erros.valor}> {erros.valor} </HelperText>
        <HelperText type="error" visible={!!erros.quantidade}> {erros.quantidade} </HelperText>
        <HelperText type="error" visible={!!erros.dataAbastecimento}> {erros.dataAbastecimento} </HelperText>
        <HelperText type="error" visible={!!erros.dataVencimento}> {erros.dataVencimento} </HelperText>

        <View style={styles.checkbox}>
          <Checkbox
            status={status ? 'checked' : 'unchecked'}
            onPress={() => {
              setStatus(!status);
            }}
          />
          <Text style={{ color: colors.text, marginTop: 10 }}>Ativa?</Text>
        </View>

        <FAB
          style={styles.fab}
          icon='content-save'
          label='Salvar'
          loading={salvandoProduto}
          disabled={erros.length > 0}
          onPress={() => salvaProduto()}
        />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
  text: {
    height: 300,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0
  },
  checkbox: {
    flexDirection: 'row',
    marginBottom: 32
  },
})

export default withTheme(AdicionaProduto)