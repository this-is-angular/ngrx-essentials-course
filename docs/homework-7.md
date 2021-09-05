### Homework example 1:
```ts
// in the state.ts file
export interface CategoryState {
  list: Category[];
}

export interface AppState {
  categories: CategoryState;
}

// in the app.module.ts

@NgModule({
  // other metadata
  imports: [
    // other imports
    StoreModule.forRoot({categories: categoriesReducer});
  ],
})
export class AppModule {}

// in selectors.ts
const categories = (state: AppState) => state.categories.list;
```
