import axios from 'axios';

export const STORE_CHARACTERS = 'STORE_CHARACTERS';
export const HARRY_IS_LOADING = 'HARRY_IS_LOADING';
export const HARRY_HAS_ERROR = 'HARRY_HAS_ERROR';

export const harryHasError = hasError => ({
  type: HARRY_HAS_ERROR,
  payload: hasError,
});

export const harryIsLoading = isLoading => ({
  type: HARRY_IS_LOADING,
  payload: isLoading,
});

export const storeCharacters = characters => ({
  type: STORE_CHARACTERS,
  payload: characters,
});

export const fetchCharacters = () => dispatch => {
  dispatch(harryIsLoading(true));
  dispatch(harryHasError(false));
  //Syntaxe de thunk pour faire un dispatch

  setTimeout(() => {
    axios
      .get('https://hp-api.onrender.com/api/characterss')
      .then(response => {
        dispatch(storeCharacters(response.data));
        dispatch(harryIsLoading(false));
        // console.log('🚀 ~ file: home.js:6 ~ Home ~ response', response);
      })
      .catch(err => {
        dispatch(harryIsLoading(false));
        dispatch(harryHasError(true));
        // console.log('🚀 ~ file: home.js:6 ~ Home ~ err', err);
      });
  }, 5000);
};
