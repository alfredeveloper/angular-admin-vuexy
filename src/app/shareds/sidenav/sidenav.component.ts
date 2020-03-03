import { Component, OnInit } from '@angular/core';
import { navs } from '../../../assets/util/js/navs';
import { appMenu, app, component } from '../../../assets/util/js/app';
import { componentFactoryName } from '@angular/compiler';

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
    app();
    component();
  }

}
