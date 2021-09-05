export class CategoriesEffects {
  handleSuccessMessage$ = createEffect(() =>
    this.actions$.pipe(
      // if you already have category update functionality covered
      ofType(addCategorySuccess, deleteCategorySuccess, updateCategorySuccess),
      tap(({ payload }) =>
        this.snackBar.open(payload.message, "Dismiss", { duration: 2000 })
      )
    )
  );
}
