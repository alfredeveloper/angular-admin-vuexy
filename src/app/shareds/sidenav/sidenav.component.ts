import { Component, OnInit } from '@angular/core';
import { navs } from '../../../assets/util/js/navs';
import { appMenu } from '../../../assets/util/js/app';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    navs();
    appMenu();
  
  }

}
