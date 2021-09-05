---
title: "Chapter 3: NgRx: The What"
sidebar_position: 3
---

## What is NgRx?

### Flux design pattern

During the last decade, Facebook has popularized an approach in building single page Web Applications called the [Flux](https://facebook.github.io/flux/docs/in-depth-overview/). [Redux](https://redux.js.org/), a vastly popular state management library for React, is built using the Flux approach, and so is NgRx. They have similar (almost the same) concepts, and serve the same need. NgRx can be called "Redux + RxJS". It combines the simplicity and centralization of Redux with the power of `Observables`.

#### So what is Flux?

In Flux, the state of the application is considered as a one unified entity, that can only be modified using a single approach, in a predesigned manner, and only in specific ways. And when we say "application state", we mean all the data that an application holds and uses to display the UI to the end user, and that can be shared between different components and layers of our application. For example, in our project, the state contains an array of categories of income, an array of expenses, an array of all expenses, and so on. This state can change through the lifecycle of the app: a user can add a new category, log some expense, or delete a log about income that was submitted erroneously. All those changes can be triggered from different parts of the application, but might be reflected in a vastly different part of the UI. For example, if a user adds a category from a special menu, it should appear in the screen where the user logs income, in a dropdown from where they can select the specific category of said income. So how do we describe such an interconnected system in a programming language without Flux? Well, there are several approaches, all of which have a varying degree of painfulness.

1. Use a global object. Of course, we can create a global `State` object, which will hold the entire application data, share the reference between the components, and use it in UI rendering. But this approach brings forward several problems:
   - State can be modified from unexpected places in unexpected ways. Someone might carelessly overwrite an existing value, thus creating a bug, and then the next developer will have a ridiculously hard time trying to find out exactly from where the problem arises.
   - Asynchronous programming poses yet another big threat to this idea, with async callbacks accessing the same reference of the object and modifying it, possible overwriting data that should have been used by another callback, introducing hard-to-fix issues like race conditions and such.
2. Using an event delivery system (like an event bus) that will notify component about specific events to which those components need to react accordingly. This would be a better approach, but still introduces problems:
   - We need to subscribe to events in every component, possibly more than a dozen of those. This can make the component code unreadable.
   - When an event is sent, it is hard to really determine _how exactly_ the state of the application is being modified. We would need to go through all subscriptions of that event to get a grasp of what it really does (and it still might not be enough)
   - Such a system might tempt developers to write lots of side effects (we will talk about side effects and how we deal with them in NgRx in later chapters)
   - If two components access the same state, we will have a problem synchronizing them together, paving way for new hard-to-fix bugs

#### So what does Flux do?

Flux solves this problem with a series of easy to grasp concepts, which bundled together comprise a state management system. It sort of utilizes both previous approaches in a way that

- Makes state easy to synchronize
- Makes changes to the state easy to track
- Allows to a actually debug state changes
- Is declarative

NgRx does the same, but for Angular. If at this point you think "why do I event bother? My app works fine right now", then let's now explore why exactly do we need solutions like NgRx.
