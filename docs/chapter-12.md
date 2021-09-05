# NgRx and Lazy Loading

## Feature states

[Lazy loading](https://angular.io/guide/lazy-loading-ngmodules) is an important Angular feature that boosts performance and allows for better, modular architecture. Basically, we split our app into feature modules, each corresponding to some app-specific feature, and then load those modules when needed (when the user navigates to them). Lazy loading is a built-in feature in Angular.

So how does NgRx relate to this? Let's examine the structure of our app to understand better.

In our financial logger app we have at least two features: categories and logs. We might want to have pages that show all the logs, add new logs, add categories, and so on, so it makes sense to keep them separated. 

But we have mentioned that the `State` in our `Store` is basically a large global object with no write access, meaning that we probably would want to define all the feature state slices beforehand; but that would kind of break the lazy loading logic: if the user never visits the category module pages, why would we even have any state related to categories stored?

Thankfully, NgRx got us covered.

## NgRx Feature states

In NgRx, data from the lazy loaded modules can be stored in what is called Feature states; basically, our `Store` now will contain data like this:

```ts
export interface AppState {
  categories: CategoryState;
  logs: LogState;
}
```

The trick here being that, say, `logs` is undefined from the start of the application until the user visits a page from the `LogsModule`. 

## Preparing for feature states

Let us first create our first lazy loaded module: `LogsModule` and include it in our routing. Now, because `LogsModule` is a separate entity, it is going to have a separate `State`. Inside `LogsModule`, create a folder named `state`, with the same files we have in the root directory `state` folder. Then, let's design our feature state:

```ts
// src/app/logs/state/state.ts
export enum LogType {
  Spend = 'Spend',
  Income = 'Income',
}

export interface Log {
  title: string;
  date: string;
  amount: number;
  type: LogType;
  categoryId: number;
}

export interface LogsState {
    logs: Log[];
    loading: {
      list: boolean;
      add: boolean;
    };
}

export const initialState: LogsState = {
  logs: [],
  loading: {
    list: false,
    add: false,
  },
};
```

So this is how our feature state will look like. It does not reference anything from the `AppState`, which is good, as our module is independent and lazy loaded. So how do we connect  this independent state with the global, `AppState`? First, we will have to write a reducer. In the `database.json` file we also have a nested object called `logs`, which is an empty array. For the purpose of providing the opportunity to grow experience, we will skip writing the reducer and allow the reader to do that themselves. 

Write a `logsReducer` and `LogsEffects` and come back to this chapter.

## Lazy loading feature states

Now our states are inside a lazy loaded modules. How do we plug them into the existing `Store`? Turns out, this is pretty easy. In the `logs.module.ts`, add these lines:

```ts
// src/app/logs/logs.module.ts 

// import statements omitted

@NgModule({
  // other metadata
  imports: [
    // other imports
    StoreModule.forFeature('logsFeature', logsReducer),
    EffectsModule.forFeature([LogsEffects]), 
  ]
})
export class LogsModule {}
```

As you have noticed, instead of `forRoot` we used methods called `forFeature`, which indicate these are reducers and effects tht are being added dynamically, after the user visits this particular module. The `StoreModule.forFeature` method's first argument is the name of the feature state, which is being used when writing feature specific selectors. Let's now write a selector that gets the list of logs (the empty array from the beginning of the chapter).

```ts
// src/app/logs/state/selectors.ts

export const logs = (state: AppState) => state.logsFeature.logs;
```

The name `logsFeature` comes from the `StoreModule.forFeature` method's first argument. NgRx provides an easy way to make less boilerplate and not have to use that name each time, by using a special `createFeatureSelector` function. Let's rewrite our selector and see it in action:

```ts
// src/app/logs/state/selectors.ts

const logsFeature = createFeatureSelector('logsFeature');

export const logs = createSelector(logsFeature, state => state.logs); // state here is already the logsFeature `State`
```

I personally use a small trick to write even less code:

```ts
// src/app/logs/state/selectors.ts

const logsFeature = createFeatureSelector('logsFeature');
const selector = <T>(mapping: (state: LogsState) => T) => createSelector(logsFeature, mapping);
export const logs = selector(state => state.logs);
```

Now our own `selector` function is a small wrapper (or a type of functions known as "partial application") around `createSelector`, which always provides the first argument, so we don't have to type it every time. 

Now we already have a functioning lazy loaded feature state.

## Where to be careful

Notice that our `AppState` is and remains a single, unique object. It is just that before the lazy loaded routes are visited, the corresponding nested feature states are `undefined`. So this may create some problems in the future if we are not careful. Imagine a scenario when we have new module, that now needs the `logs` data. Because `logs` is a lazy loaded feature, that data may or may not be available depending on whether the user had previously visited the `logs` routed pages. So if we need some data somewhere, we have to make sure that data is available higher up, and not in another lazy loaded module. As an exercise, try to determine if we need to make the `categories` a separately loaded feature module like `logs`

## Homework

Homework for this chapter is quite extensive and non-specific: implement the whole lifecycle for financial logs: creating new logs, deleting them, and so on. Future chapters will assume those are implemented, and this will also be an important exercise for our newly acquired skills. If you want any sort of hints and guidance, feel free to take a look at the example app, where all the features are implemented. 
