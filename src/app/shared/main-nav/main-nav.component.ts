import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  opened: boolean = true;

  constructor(private router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
  }

  test(){
    this.router.navigate(['login']);
  }

  onSideNav(){
    this.opened = !this.opened;
  }

  goTo(route: string){
    this.router.navigate([route]);
  }
}
