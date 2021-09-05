---
title: "Chapter 9: Building a real application"
sidebar_position: 9
---

## What makes a real WebApp?

In our code so far, we have added and used data models that we stored in variables (the `Store` itself is just a variable in the operational memory of the computer). Of course that sort of data lacks persistence, meaning we can add categories, expenses a other data, but when we just reload the page, all that data will be gone. Frankly speaking, this makes our app a bit useless, so let's fix it.

## Building a backend

Don't be worried because of the title of this paragraph, we are not going to build a _real_ backend. Instead, for learning purposes, to better emulate a real development environment, we are going to run a mock backend using a special tool called `json-server`. It is a program written in Node.js that takes a JSON file and turns it into a sort of a database, running it ona specific port, so that we can access it using HTTP requests. It follows the REST principles. so we can:

1. Use `get` requests to retrieve lists of data
2. Use `get` requests by `id` to retrieve a single entity from the "database"
3. Use `post` requests to add new entities to the database
4. Use `patch` or `put` requests to update existing entities
5. Use `delete` requests to delete entities from the database

We are going to use this tool to build an API that supports our financial logging application.

## Installation

Installing is simple. We have to install it globally so we are able to run it in any folder on our machines. Open the command line in any folder (though preferably inside our application directories) and run

```bash
npm install -g json-server
```

When the installation is finished, head to this [file](https://github.com/Armenvardanyan95/ngrx-tutorial-app/blob/main/database.json) on GitHub and download it's contents to the root directory of your application. Let's explore the contents a little. The file looks like this:

```ts
{
  "categories": [
    {
      "id": 1,
      "name": "Food"
    },
    {
      "id": 2,
      "name": "Electricity bills"
    },
    {
      "id": 1,
      "name": "Car repair"
    }
  ],
  "expenses": [
    // omitted for brevity
  ]
}
```

As you see, we have data about the categories and expenses. When we run `json-server` on our `database.json` file, we will have access to the categories through `http://localhost:3000/categories/` URL, and to the expenses through `http://localhost:3000/expenses/` URL. Let's do this! In your root directory, run

```bash
json-server database.json
```

and head to `http://localhost:3000/`. You will be greeted with a welcome page that lists pour resources, in our case, the `/categories` and the `/expenses`. If you click on the URLs, you wi;ll see the actual data from the `database.json` file. Our API is up and running!

## Accessing the API from our application

In Angular, as you most probably know, we use services to interact with remote APIs. Let's create a service for interacting with the categories section of our database. Under the `src/app` directory, create a folder named `services`, and put a `category.service.ts` file in it (you can use `ng generate`). In that service, let's add methods for retrieving, creating and deleting categories. In the end, your service might look like this:

```ts
// src/app/services/category.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class CategoryService {
  readonly baseUrl = "http://localhost:3000/categories";

  constructor(private readonly http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  addCategory(category: Category) {
    return this.http.post<Category>(this.baseUrl, category);
  }

  deleteCategory(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

In next chapters, we will be using this service to add categories, retrieve them and delete them _really_, with a database and persistence.
This chapter has been a setup of some tools that we are going to use extensively. In the upcoming chapter, we will learn to interact with remote APIs in an NgRx way.
