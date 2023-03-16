import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const Login = ({onLogin}) => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'https://login.hikkary.com/users/login',
      data: {
        username: inputs.email,
        password: inputs.password,
      },
    })
      .then(res => {
        console.log(res.headers['x-access-token']);
        AsyncStorage.setItem('token', res.headers['x-access-token'])
          .then(() => {
            onLogin(); // Ajoutez cette ligne pour appeler la fonction onLogin

            // navigation.navigate('Home');
          })
          .catch(err => {
            console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
          });
      })
      .catch(err => {
        console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
      });
  };

  return (
    <Container>
      <StyledText>Login</StyledText>
      <Touchable onPress={() => navigation.goBack()}>
        <StyledText>Go Back</StyledText>
      </Touchable>
      <InputContainer>
        <TextInputStyled
          placeholder="Email"
          value={inputs.email}
          onChangeText={text => setInputs({...inputs, email: text})}
        />
      </InputContainer>
      <InputContainer>
        <TextInputStyled
          placeholder="Password"
          value={inputs.password}
          onChangeText={text => setInputs({...inputs, password: text})}
        />
      </InputContainer>
      <Touchable onPress={handleLogin}>
        <StyledText>LOGIN</StyledText>
      </Touchable>
    </Container>
  );
};

const InputContainer = styled.View`
  margin: 4px;
`;

const TextInputStyled = styled.TextInput`
  background-color: black;
  padding: 12px;
  color: white;
`;

const Touchable = styled.TouchableOpacity``;

const StyledText = styled.Text`
  color: blue;
`;

const Container = styled.View`
  flex: 1;
`;

export default Login;
