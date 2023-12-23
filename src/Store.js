import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {},
    
  friendsList: localStorage.getItem('friendsList')
    ? JSON.parse(localStorage.getItem('friendsList'))
    : [],

 
};
function reducer(state, action) {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, userInfo: null };

    case 'ADD_FRIEND':

    const friendsList = action.payload;
    // const existingFriends = state.userInfo.friends.find((friend)=> friend === newUser);

    // const friendsList = existingFriends ? state.userInfo.friends.filter((exisiting)=> exisiting !== newUser) :  [...state.userInfo.friends, newUser ];
  
      localStorage.setItem('friendsList', JSON.stringify(friendsList));
      return {
        ...state,
        userInfo: { ...state.userInfo, friends:{...state.userInfo.friends, friendsList }},
      };
      

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
