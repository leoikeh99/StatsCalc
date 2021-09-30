import { createContext } from "react";
import React, { useReducer } from "react";
const SET_VIEW_SAVE = "SET_VIEW_SAVE";
const SET_SAVES = "SET_SAVES";
const saveContext = createContext();

const saveReducer = (state, action) => {
  switch (action.type) {
    case SET_VIEW_SAVE:
      return {
        ...state,
        viewSave: action.payload,
      };

    case SET_SAVES:
      return {
        ...state,
        saves: action.payload,
      };
  }
};

const SaveState = (props) => {
  const initialState = { viewSave: null, saves: [] };
  const [state, dispatch] = useReducer(saveReducer, initialState);

  const setViewItem = (save) => {
    dispatch({ type: SET_VIEW_SAVE, payload: save });
  };

  const setSaves = (saves) => {
    dispatch({ type: SET_SAVES, payload: saves });
  };

  return (
    <saveContext.Provider
      value={{
        viewSave: state.viewSave,
        saves: state.saves,
        setViewItem,
        setSaves,
      }}>
      {props.children}
    </saveContext.Provider>
  );
};

export { saveContext, SaveState };
