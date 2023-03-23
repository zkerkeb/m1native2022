import { combineReducers } from 'redux';
import counter from './counter';
import harry from './harry';

export default combineReducers({
  counter,
  harry,
});
