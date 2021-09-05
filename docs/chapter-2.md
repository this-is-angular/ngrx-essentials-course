---
title: "Chapter 2: Getting started: Installing dependencies and creating the project"
sidebar_position: 2
---

## Installations

### NodeJS/Angular

If you already have NodeJS and Angular CLI on your machine, skip this step. Otherwise, do the following:

1. Download NodeJS
2. Install it on your machine. This may take several minutes
3. Install Angular CLI: open your command line tool/terminal and run the following command: `npm install @angular/cli -g`
4. We are done. You can read more about Angular CLI in the official docs

### Creating the project

As I mentioned in the previous chapter, we are going to create an Angular finance logging application with NgRx. Let's create this project and get started:

1. Open a preferred directory of yours
2. Run the following command `ng new finance-logger`
3. You can select a number of options, add routing, SCSS, and so on. Those options are irrelevant tou this tutorial
4. Wait a bit
5. Application has been created

Now let's add NgRx to the party:

1. Run the command `cd financial-logger` to move to the root directory of our project
2. Run the command `npm install @ngrx/store` to get NgRx
3. NgRx consists of several packages, but the most basic functionality is inside `@ngrx/store`.
4. We will add more packages as we dive into more complex concepts

That's it. Now we have an empty project with NgRx installed.

## Up and running

In the `app.module.ts` file, add the following import:

```ts
import { StoreModule } from "@ngrx/store";
```

And in the `imports` array of the `AppModule` declarations, add this line:

```ts
@NgModule({
  // other metadata
  imports: [
    // other imports
    StoreModule.forRoot(),
  ],
})
export class AppModule {}
```

1. Run `ng serve`
2. Open `http://localhost:4200/`
3. See our fresh Angular app

That's it, we did the basic installations, let's now move on to chapter 3, where we will explore the the
