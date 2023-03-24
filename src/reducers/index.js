import { combineReducers } from 'redux';
import counter from './counter';
import harry from './harry';
import todo from './todo';

export default combineReducers({
  counter,
  harry,
  todo,
});
