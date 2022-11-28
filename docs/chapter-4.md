---
title: "Chapter 4: NgRx: The Why"
sidebar_position: 4
---

## Why do we need NgRx?

### Reasonable state

As mentioned in the previous chapter, we need a state management solution that is predictable, scalable and easy to reason about. Those might sound like big words, but in reality it simply means the following:

> I want to be able to fix bugs without having a migraine

### How do bugs happen?

In most cases, we have bugs not because the code is wrong (in that case we essentially didn't tell the computer what _exactly_ we wanted), but because the data is not in the expected state. The variable `age` all of a sudden holds a negative value, because someone misclicked when the IDE offered an autocomplete or a correction. Or maybe the Array of users is empty, because we called the wrong API, or stored the data in the wrong variable, or forgot to subscribe. Problems like this happen _all the time_. Remember the last very annoying bug you encountered. Was it because of a very minor mistake like a typo? If yes, answer the following: how frustrating was the whole experience?

## What does NgRx offer?

NgRx, as mentioned, is built on concepts of Redux. It utilizes core ideas like `Stores` (the place where the application states is stored), `Actions` (events that notify the `Store` that some change to the state is to happen), `Reducers` (functions that determine how a certain `Action` affects the `State`), and also adds concepts like `Selectors` (functions that allow to pick a slice of the `State` as an `Observable`) and `Effects` (special functions that work on side effects like data loading and API calls). It also provides utility functions to make writing boilerplate code easier and even utility libraries like `@ngrx/entity` to work with large lists of data. We will learn in depth about all of those concepts and tools in corresponding chapters.

Together, this tools allow us to build a truly scalable state management solution.

## Isn't this just overengineering?

At this point you might think "again, I don't need all of these ideas and abstract concepts. In practice, my app works fine!". But think about how scalable your architecture is. Will it be easy to incorporate more and more interconnected relations between layers and components of your app? Will it be easy to add new modules that depend on existing data as well as introduce new states? If you overthink now, know that NgRx got you covered.

## What NgRx is **not**

Some developers assume that "better architecture" means "less code". This is far from true. Actually, sometimes it is better to have a few more lines of code that are explicit and simple rather than a very short, but mystical algorithm. NgRx certainly **does not** reduce the lines of code (LOC). Sure, your components will become simpler and have less LOC (which is part of our goal), but instead we will write lots of `Actions`, `Reducers` and so on, which will definitely compensate for the small gains that we receive in the component class code. So why bother? Because in return we will get simplicity that we so much desire

So, let's finally get down to learning those concepts and putting them into practice.
