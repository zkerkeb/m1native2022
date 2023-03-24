import { ADD_TODO, DELETE_TODO } from '../actions/todo';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};
