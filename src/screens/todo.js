import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addTodo, deleteTodo } from '../actions/todo';

const Todo = () => {
  const list = useSelector(state => state.todo.list);
  const [input, setInput] = React.useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (!input) {
      Alert.alert('Please enter a todo');
      return;
    }
    dispatch(addTodo(input));
    setInput('');
  };

  const handleDelete = id => {
    Alert.alert('Delete', 'Are you sure you want to delete this todo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(deleteTodo(id));
        },
      },
    ]);
  };

  return (
    <Container>
      <Title>Todo</Title>
      <Input value={input} onChangeText={text => setInput(text)} />
      <TouchableOpacity onPress={handleAddTodo}>
        <Title>Add</Title>
      </TouchableOpacity>
      {list.map(item => (
        <>
          <Title key={item.id}>{item.todo}</Title>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Title>Delete</Title>
          </TouchableOpacity>
        </>
      ))}
    </Container>
  );
};

const Input = styled.TextInput`
  height: 40px;
  margin: 12px 0;
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  color: palevioletred;
`;

export default Todo;
