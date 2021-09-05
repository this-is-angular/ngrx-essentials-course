const _reducer = createReducer(
  initialState,
  // other handlers
  on(deleteAllCategories, (state, action) => ({ ...state, categories: [] })) // just assign a new empty array for categories
);
