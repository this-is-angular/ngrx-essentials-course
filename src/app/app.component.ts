import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-tutorial';
  sidebarOpen = false;
  chapters = [
    'Introduction to NgRx',
    'Getting started: Installing dependencies and creating the project',
    'NgRx: the What',
    'NgRx: the Why',
    'Actions',
    'Reducers',
  ];

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => window.scrollTo({top: 0, behavior: 'smooth'}));
  }
}
