### Homework example 1:
```ts
// in the category-list-presenter.ts file
export class CategoryListPresenterComponent {
  @Input() categories: Category[] = [];
  @Output() categoryAdded = new EventEmitter<Category>();
  @Output() categoryDeleted = new EventEmitter<string>();
  newCategoryName = '';

  addCategory() {
    this.categoryAdded.emit({name: this.newCategoryName});
  }
  
  deleteCategory(categoryName: string) {
    this.categoryDeleted.emit(categoryName); // emitting a delete event
  }
}
```

```html

<-- in the category-list presenter template -->
<mat-list>
  <mat-list-item *ngFor="let category of categories">
    {{ category.name }}
    <button mat-button (click)="deleteCategory(category.name)">Delete</button>
  </mat-list-item>
</mat-list>
<mat-form-field>
  <mat-label>New Category Name:</mat-label>
  <input matInput [(ngModel)]="newCategoryName"/>
  <button mat-button (click)="addCategory()">Add Category</button>
</mat-form-field>
```
## Homework example 2:
```ts
// in the category-list container component

@Component({
  selector: 'app-category-list-container',
  template: `
  <app-category-list-presenter [categories]="categories$ | async"
                               (categoryAdded)="addCategory($event)"
                               (categoryDeleted)="deleteCategory($event)">
  </app-category-list-presenter>`,
  styleUrls: ['./category-list-container.component.scss']
})
export class CategoryListContainerComponent implements OnInit {
  categories$ = this.store.select(categories)

  constructor(
    private readonly store: Store,
  ) { }

  ngOnInit() {
  }

  addCategory(category: Category) {
    this.store.dispatch(addCategory({payload: category})); // this is where magic happens
  }

  deleteCategory(categoryName: string) {
    this.store.dispatch(deleteCategory({payload: categoryName}));
  }

```
