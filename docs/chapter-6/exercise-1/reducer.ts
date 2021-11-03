const _reducer = createReducer(
  initialState,
  // other handlers
  on(actions.deleteCategory, (state, category) => ({
    ...state,
    categories: state.categories.filter(
      (cat) => cat.name !== category.name
    ), // filter out the deleted category
  }))
);
