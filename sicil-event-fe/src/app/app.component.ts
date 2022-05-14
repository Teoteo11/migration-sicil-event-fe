import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  url = '';
  routeSub: Subscription;

  ngOnInit(): void {
    console.log('BENVENUTO SU HEROKU')
  }


  constructor(private router: Router) {
    this.routeSub = router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.url
        console.log("🚀 ~ file: app.component.ts ~ line 22 ~ AppComponent ~ .subscribe ~ this.url", this.url)
      });
  }


  title = 'sicil-event-fe';

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
