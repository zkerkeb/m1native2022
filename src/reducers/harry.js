import {
  HARRY_HAS_ERROR,
  HARRY_IS_LOADING, STORE_CHARACTERS
} from '../actions/harry';

const initialState = {
  characters: [],
  isLoading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    case HARRY_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case HARRY_HAS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
