import React, { useContext } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {

  const { state, dispatch } = useContext(UsersContext)

  //Metodo que pede uma confirmação para a exclusão de um usuário
  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          })
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  //Metodo que cria os botoes de edição e exclusão de um usuário
  function getAction(user) {
    return (
      <ListItem>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={
            <Icon
              name="edit"
              size={25}
              color="orange"
            />
          }
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={
            <Icon
              name="delete"
              size={25}
              color="red"
            />
          }
        />
      </ListItem>
    )
  }

  //Metodo que cria a lista de usuarios com o avatar
  function getUserItem({ item: user }) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}>
        <Avatar rounded source={{ uri: user.avatar_url }} size="medium" />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          {getAction(user)}
        </ListItem.Content>
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={state.users}
        renderItem={getUserItem} />
    </View>
  )
}