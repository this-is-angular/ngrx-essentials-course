export class CategoriesEffects {
  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategory),
      mergeMap(({ payload }) =>
        this.categoriesService.deleteCategory(payload).pipe(
          map(() => deleteCategorySuccess({ payload })),
          catchError(() => of(loadCategoriesError()))
        )
      )
    )
  );
}
