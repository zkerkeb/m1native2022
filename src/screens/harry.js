import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../actions/harry';

const Harry = () => {
  const characters = useSelector(state => state.harry.characters);
  const isLoading = useSelector(state => state.harry.isLoading);
  const isError = useSelector(state => state.harry.error);
  console.log('🚀 ~ file: harry.js:7 ~ Harry ~ characters:', characters);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCharacters());
  }, []);

  if (isError) {
    return <Text>Y'a une erreur Sorcier</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {characters.map(character => (
        <Text>{character.name}</Text>
      ))}
    </View>
  );
};

export default Harry;
