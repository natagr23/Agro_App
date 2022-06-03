export const reducer = (state, action) => {
  if (action.type === "TOGGLE_NAV") {
    return {
      ...state,
      isToggled: !state.isToggled,
    };
  }
  if (action.type === "TOGGLE_MOBILE") {
    return {
      ...state,
      isToggleMobile: !state.isToggleMobile,
    };
  }
  if (action.type === "TOGGLE_THEME") {
    return {
      ...state,
      darkMode: !state.darkMode,
    };
  }
  if (action.type === "SET_SEARCH") {
    return {
      ...state,
      search: action.payload,
    };
  }
  if (action.type === "SET_PARTY") {
    return {
      ...state,
      party: action.payload,
    };
  }
};
