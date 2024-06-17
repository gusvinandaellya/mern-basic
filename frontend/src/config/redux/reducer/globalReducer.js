const initialState = {
  name: 'Vina'
};

const globalReducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_NAME') {
    return {
      ...state,
      name: 'Eliavina'
    }
  }
  return state;
}

export default globalReducer;