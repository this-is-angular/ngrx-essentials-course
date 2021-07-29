### Homework example 1:
```ts
// in the category-list-presenter.ts file
export class CategoriesEffects {
  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCategory),
    mergeMap(({payload}) => this.categoriesService.deleteCategory(payload).pipe(
      map(() => deleteCategorySuccess({payload})),
      catchError(() => of(loadCategoriesError())),
    ))
  ));
}
```

### Homework example 2:
```ts
export class CategoriesEffects {
  addCategory$ = createEffect(() => this.actions$.pipe(
    ofType(addCategory),
    mergeMap(({payload}) => this.categoriesService.addCategory(payload).pipe(
      map((result) => addCategorySuccess({payload: result})),
      catchError(() => of(addCategoryError())),
    )),
  ));
}
```
