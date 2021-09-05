export class CategoriesEffects {
  handleErrorMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCategoryError, deleteCategoryError),
      tap(({ payload }) =>
        this.snackBar.open(payload.message, "Dismiss", { duration: 2000 })
      )
    )
  );
}
