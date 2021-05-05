### Homework example 1:
```ts
const _reducer = createReducer(
  initialState,
  // other handlers
  on(deleteCategory, (state, action) => ({
    ...state,
    categories: state.categories.filter(category => category.name !== action.payload), // filter out the deleted category
  })),
);
```

### Homework example 2:
```ts
const _reducer = createReducer(
  initialState,
  // other handlers
  on(deleteAllCategories, (state, action) => ({...state, categories: []})), // just assign a new empty array for categories
);
```
