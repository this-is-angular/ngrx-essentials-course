import { Component, Input, OnChanges } from '@angular/core';
import { iif, Observable, of } from 'rxjs';

@Component({
  selector: 'app-homework',
  template: `<details *ngIf="homework$ | async as homework">
              <summary>Homework Solution example (click to see) </summary>
              <markdown [src]="homework" lineNumbers></markdown>
             </details>`,
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnChanges {
  @Input() chapterNumber: number;
  homework$: Observable<string> = of('');

  ngOnChanges() {
    this.homework$ = iif(
      () => this.chapterNumber > 4,
      of(`/assets/content/homeworks/homework-${this.chapterNumber}.md`),
      of(null),
    );
  }

}
