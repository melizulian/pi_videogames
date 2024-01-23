const initialState = {
  // ... estado inicial
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEOGAMES':
      return {
        ...state,
        videogames: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;