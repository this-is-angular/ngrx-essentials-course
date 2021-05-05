import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit {

  chapterNumber$ = this.route.paramMap.pipe(
    map(params => params.get('chapter')),
  );

  chapterPath$ = this.chapterNumber$.pipe(
    map(chapter => `assets/content/chapters/chapter-${chapter}.md`),
  );

  nextChapterUrl$ = this.route.paramMap.pipe(
    map(params => +params.get('chapter')),
    map(chapter => [`/chapters/${chapter + 1}`]),
  );

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }



}
