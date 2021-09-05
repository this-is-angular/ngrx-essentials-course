export class CategoriesEffects {
  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCategory),
      mergeMap(({ payload }) =>
        this.categoriesService.addCategory(payload).pipe(
          map((result) => addCategorySuccess({ payload: result })),
          catchError(() => of(addCategoryError()))
        )
      )
    )
  );
}
