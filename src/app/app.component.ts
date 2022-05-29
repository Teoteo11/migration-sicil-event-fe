import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  url = '';
  routeSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.routeSub = router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.url;
      });
  }

  showNav = () => 
    this.url !== '/choose-role' && this.url !== '/login' 
    && this.url !== '/sell-ticket' && this.url !== '/' 
    && this.url.length < 30 || this.route.snapshot.queryParams['id']
  

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
