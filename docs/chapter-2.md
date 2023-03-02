---
title: "Chapter 2: Getting started: Installing dependencies and creating the project"
sidebar_position: 2
---

## Installations

### NodeJS/Angular

If you already have NodeJS and Angular CLI on your machine, skip this step. Otherwise, do the following:

1. Download and install [NodeJS](https://nodejs.org)
1. Install the [Angular CLI](https://angular.io/cli) by running the following command:  

  ```sh
  npm install -g @angular/cli
  ```

### Creating the project

As I mentioned in the previous chapter, we are going to create an Angular finance logging application with NgRx.

Let's create this project and get started by creating a new Angular project:

```sh
ng new finance-logger --minimal --defaults
```

Let's now add NgRx `store` to the party:

```sh
cd financial-logger
npm install @ngrx/store
```

:::note

NgRx is divided into [several packages](https://ngrx.io/docs#packages), but the most basic functionalities are provided from `@ngrx/store`, we will be using additional packages as we dive into more complex concepts.

:::

That's it, we now have an empty project with NgRx installed!

### Using standalone components

Since Angular is heavily pushing towards standalone components, let's remove our `AppModule` by taking advantage of the new syntax:

1. Set the `standalone` flag to true in the `app.component.ts`:  

  ```ts {3} title="app.component.ts"
  @Component({
  selector: 'app-root',
  standalone: true,
  template: '...',
  styles: []
  })
  export class AppComponent {
    title = 'finance-logger';
  }
  ```

1. Remove the `app.module.ts`
1. Replace the following content in `main.ts` to indicate Angular to create the application from your `AppComponent` instead of your `AppModule`:  

```diff title="main.ts"
- platformBrowserDynamic().bootstrapModule(AppModule)
+ bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
```

## Up and running

Finally, all we have to do is to add our (empty) store to the app before launching it by calling `provideStore` from the application's providers:

```ts {2} title="main.ts"
bootstrapApplication(AppComponent, {
  providers: [ provideStore() ]
}).catch((err) => console.error(err));
```

We are all set! You can run the following commmand to launch our Angular application and see it running on [http://localhost:4200/](http://localhost:4200/):

```sh
ng serve --open
```

Now that the setup is done, we can move on to [chapter 3](./chapter-3.md) where we will explore what NgRx is and where it came from.
