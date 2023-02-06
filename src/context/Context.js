import React, { useReducer, createContext } from "react";
import { feedReducer } from "./reducers/FeedReducer";

// Initial state
const initialState = {
  currentFeed: {
    episodes: [],
    program_title: '',
    program_image: '',
    program_description: '',
    program_link: ''
  },
  onFetching: false,
  previousFeeds: [],
  error: false,
  favoriteFeeds: []
};

// Create context
const Context = createContext({});

// Combine reducer function
const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// Context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(feedReducer), initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };