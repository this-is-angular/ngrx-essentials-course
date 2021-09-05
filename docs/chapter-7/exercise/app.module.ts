@NgModule({
  // other metadata
  imports: [
    // other imports
    StoreModule.forRoot({ categories: categoriesReducer }),
  ],
})
export class AppModule {}
