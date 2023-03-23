import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCounter } from '../../actions/counter';

const ReduxCounter = () => {
  const {value} = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>ReduxCounter</Text>
      <Text>{value}</Text>
      <Button title="Increment" onPress={() => dispatch(incrementCounter())} />
    </View>
  );
};

export default ReduxCounter;
