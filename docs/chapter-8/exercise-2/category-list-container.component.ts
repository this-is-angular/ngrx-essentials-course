@Component({
  selector: "app-category-list-container",
  template: `<app-category-list-presenter
    [categories]="categories$ | async"
    (categoryAdded)="addCategory($event)"
    (categoryDeleted)="deleteCategory($event)"
  >
  </app-category-list-presenter>`,
  styleUrls: ["./category-list-container.component.scss"],
})
export class CategoryListContainerComponent implements OnInit {
  categories$ = this.store.select(categories);

  constructor(private readonly store: Store) {}

  ngOnInit() {}

  addCategory(category: Category) {
    this.store.dispatch(addCategory({ payload: category })); // this is where magic happens
  }

  deleteCategory(categoryName: string) {
    this.store.dispatch(deleteCategory({ payload: categoryName }));
  }
}
