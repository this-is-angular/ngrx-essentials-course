const _reducer = createReducer(
  initialState,
  // other handlers
  on(actions.deleteAllCategories, (state) => ({ ...state, categories: [] })) // just assign a new empty array for categories
);
