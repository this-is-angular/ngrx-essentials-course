### Homework example 1:
```ts
// in the effects.ts file
export class CategoriesEffects {
  handleSuccessMessage$ = createEffect(() => this.actions$.pipe(
    // if you already have category update functionality covered
    ofType(addCategorySuccess, deleteCategorySuccess, updateCategorySuccess),
    tap(({payload}) => this.snackBar.open(payload.message, 'Dismiss', {duration: 2000})),
  ));
}
```

### Homework example 2:
```ts
export class CategoriesEffects {
  handleErrorMessage$ = createEffect(() => this.actions$.pipe(
    ofType(addCategoryError, deleteCategoryError),
    tap(({payload}) => this.snackBar.open(payload.message, 'Dismiss', {duration: 2000})),
  ));
}
```
