const _reducer = createReducer(
  initialState,
  // other handlers
  on(actions.deleteCategory, (state, {name}) => ({
    ...state,
    categories: state.categories.filter(
      (cat) => cat.name !== name
    ), // filter out the deleted category
  }))
);
