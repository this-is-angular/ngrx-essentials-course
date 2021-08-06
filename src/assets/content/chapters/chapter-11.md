# Effects in depth

## HTTP is not the only type of side effects

In the previous chapter, we have learned about using NgRx `Effects` to perform HTTP requests through the Store-State architecture. In this chapter, we are going to explore some more complicated cases and tie together some things.

Let's explore the following scenario: we want to show toast notifications whenever there is a successful addition/deletion of a category. As we are using Angular Material, we are going to use its own `Snackbar` component, which is being triggered via a special service. First of all, let's go on and add the `SnackbarModule` to our `AppModule`. Then, let's understand how it operates in relation to NgRx `Store` and `Effects`. It is an action tangential to some operations on our `Store` data, meaning it is, in fact, an `Effect`. Now let's discuss how it will be implemented. Naturally, we are going to have many such action success messages, so we want such a solution that does not require us to write a specific effect handler for each HTTP call success message. The best approach would be such that adds an optional string `message` to the HTTP call success `Actions` payload, which would then be displayed by one single `Effect`. Let's rewrite our category add success action:

```ts
export const addCategorySuccess = createAction('[Category List] Add Category Success', props<{payload: {data: Category, message?: string}}>());
```

As you see, we changed the payload from just being a category object to a wrapper object that separately contains the response data and the message. Now, we only have to write a handler that will display the success message in the UI. 

This effect handler, though, cannot be in a class called `CategoriesEffects`, because our app will contain multiple calls and many of them will not be related to categories at all. But we will learn how to use multiple effects (and lazy load chunks of states/effects per modules) in future chapters, so for now let's put the handler in our only existing `Effect` class (notice we will also have to rewrite our `Reducer` slightly because of the payload type change, but we will leave this as a small exercise for the reader):

```ts
export class CategoriesEffects {

  // other effect handlers omitted for brevity

  addCategory$ = createEffect(() => this.actions$.pipe(
    ofType(addCategory),
    mergeMap(({payload}) => this.categoriesService.addCategory(payload).pipe(
      map((result) => addCategorySuccess({payload: {data: result, message: 'Category successfully added'}})),
      catchError(() => of(addCategoryError())),
    )),
  ));

  handleSuccessMessage$ = createEffect(() => this.actions$.pipe(
    ofType(addCategorySuccess),
    tap(({payload}) => this.snackBar.open(payload.message, 'Dismiss', {duration: 2000})),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly categoriesService: CategoryService,
    // we injected the snackbar service to use
    private readonly snackBar: MatSnackBar,
  ) { }

}
```

## Not all effects should dispatch

You might notice that out Effect handler does not `map` the piped `Action` to another `Action` as in all other cases; that is because after performing this `Action` there is nothing else we have to do in terms of our `State`. This is a side effect purely for the purpose of the side effect. But this (not mapping to another `Action`) will actually cause a `TypeError`, as NgRx expects the Effect stream to map to an `Action`. So how do we fix this?

```ts
export class CategoriesEffects {

  // other effect handlers omitted for brevity

  handleSuccessMessage$ = createEffect(() => this.actions$.pipe(
    ofType(addCategorySuccess),
    tap(({payload}) => this.snackBar.open(payload.message, 'Dismiss', {duration: 2000})),
  ) {dispatch: false});

  // constructor omitted

}
```

The `dispatch: false` flag is used to indicate to NgRx that this particular effect is not impacting the `Store`, so it won't be dispatching a resulting `Action`. use this flag whenever you are performing effects on actions that do not result in other actions.

## Handling multiple Effects

But what about other success messages? Surely, we are not going to write effect handlers for each and every success message action? Turns out, NgRx got us covered; here is how we handle multiple actions in one effect:

```ts
export class CategoriesEffects {
    
  // other effect handlers omitted for brevity

  handleSuccessMessage$ = createEffect(() => this.actions$.pipe(
    ofType(addCategorySuccess, deleteCategorySuccess),
    tap(({payload}) => this.snackBar.open(payload.message, 'Dismiss', {duration: 2000})),
  ));

  // constructor omitted

}
```

So the `ofType` operator can accept multiple actions and handle if any of them is dispatched. Let's understand how the `payload` type is being inferred by NgRx. If we combine actions A and B with payloads of type X and Y respectively using `ofType`, the resulting type will be `X | Y`, meaning it will contain only properties that are present on both action types. In our case, we modified the `deleteCategorySuccess` action so that its payload also contains a `message` optional property of type `string`. Thus, the resulting payload type is an object `{message?: string}`, which is perfect for our case.

## Homework

Tasks for this homework are going to be pretty simplistic 

1. Add handlers for all success messages
2. Create handlers for error messages too.


