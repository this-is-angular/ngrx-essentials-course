export class CategoryListPresenterComponent {
  @Input() categories: Category[] = [];
  @Output() categoryAdded = new EventEmitter<Category>();
  @Output() categoryDeleted = new EventEmitter<string>();
  newCategoryName = "";

  addCategory() {
    this.categoryAdded.emit({ name: this.newCategoryName });
  }

  deleteCategory(categoryName: string) {
    this.categoryDeleted.emit(categoryName); // emitting a delete event
  }
}
