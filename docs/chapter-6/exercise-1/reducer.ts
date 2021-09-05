const _reducer = createReducer(
  initialState,
  // other handlers
  on(deleteCategory, (state, action) => ({
    ...state,
    categories: state.categories.filter(
      (category) => category.name !== action.payload
    ), // filter out the deleted category
  }))
);
