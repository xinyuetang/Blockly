import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError, RoutesRecognized } from '@angular/router';
declare var homeShow: (container, output) => any;
// declare var homeShow: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navigationSubscription: any;
  routerPath: string;

  constructor(private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // console.log('Router方式:', event.url.substr(1));
        this.render();
      }
    });
  }

  render() {
    const container = document.getElementById('home_container');
    const output = document.getElementById('home_output');
    homeShow(container, output);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.render();
  }

  onStart() {
    this.router.navigate(['/quick-start']);
  }

}
