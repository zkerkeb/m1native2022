import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { FlatList, Image } from 'react-native';
import styled from 'styled-components';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_KEY = 'remplissez';
const PRIVATE_KEY = 'remplissez';
//  function generateHash(ts) {     const hash = md5(ts + PRIVATE_KEY + API_KEY);     return hash; }

const CharacterRow = ({uriImage, name, description}) => {
  return (
    <>
      <Image
        style={{width: 100, height: 100}}
        source={{
          uri: uriImage,
        }}
      />
      <StyledText>
        {name} - {description}
      </StyledText>
    </>
  );
};

const Home = props => {
  const [page, setPage] = React.useState(0);
  const [characters, setCharacters] = React.useState([]);
  useFocusEffect(() => {
    // AsyncStorage.removeItem('token');
    AsyncStorage.getItem('token')
      .then(token => {
        if (!token) {
          props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ err', err);
      });
  });

  useEffect(() => {
    getCharacters();
  }, [page]);

  const getCharacters = id => {
    const ts = 1;
    // const hash = generateHash(ts);
    const hash = '3200d4b23a1b118f42bb12eeeaaa31e4';

    axios
      .get(`${BASE_URL}/characters`, {
        params: {
          apikey: API_KEY,
          ts: ts,
          hash: hash,
          // populate: 'image',
          limit: 20,
          offset: page * 20,
        },
      })
      .then(response => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ response', response);
        setCharacters([...characters, ...response.data.data.results]);
      })
      .catch(err => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ err', err);
      });
  };

  const handleNavigation = page => {
    props.navigation.navigate(page);
  };
  return (
    <Container>
      <StyledText>Home</StyledText>
      <StyledButton onPress={() => handleNavigation('Login')}>
        <StyledText>To Login</StyledText>
      </StyledButton>
      <FlatList
        data={characters}
        onEndReached={() => {
          console.log('end reached');
          setPage(page + 1);
        }}
        renderItem={({item}) => (
          <CharacterRow
            name={item.name}
            description={item.description}
            uriImage={`${item.thumbnail?.path.replace('http', 'https')}.${
              item.thumbnail?.extension
            }`}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
`;

const StyledText = styled.Text`
  color: red;
`;

const Container = styled.View`
  flex: 1;
`;

export default Home;
