// /Users/hikkary/projet/m1exemple/src/screens/details.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_KEY = 'e1deb495f57e4ff291e185cfe0d853e3';
const PRIVATE_KEY = 'remplissez';
const Details = ({route}) => {
  const {characterId} = route.params;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    getCharacterDetails();
  }, []);

  const getCharacterDetails = () => {
    const ts = 1;
    const hash = '3200d4b23a1b118f42bb12eeeaaa31e4';

    axios
      .get(`${BASE_URL}/characters/${characterId}`, {
        params: {
          apikey: API_KEY,
          ts: ts,
          hash: hash,
        },
      })
      .then(response => {
        setCharacter(response.data.data.results[0]);
      })
      .catch(err => {
        // // console.log('🚀 ~ file: details.js:6 ~ Details ~ err', err);
      });
  };

  if (!character) {
    return <StyledText>Loading...</StyledText>;
  }

  return (
    <Container>
      <StyledText>{character.name}</StyledText>
      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: `${character.thumbnail.path.replace('http', 'https')}.${
            character.thumbnail.extension
          }`,
        }}
      />
      <StyledText>Description:</StyledText>
      <StyledText>
        {character.description || 'Aucune description disponible'}
      </StyledText>
    </Container>
  );
};

const StyledText = styled.Text`
  color: red;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Details;
