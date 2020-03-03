import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  employee: Employee;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { 

    this.employee = new Employee(0, '', '', new Date(), '', '', '', [0]);

  }

  ngOnInit() {
    this.obtenerEmpleado();
  }

  cerrarSesion() {

    this.authService.logout();
    this.router.navigate(['/iniciar-sesion'])

  }

  obtenerEmpleado() {

    let lsEmployee = JSON.parse(localStorage.getItem('currentEmployee')); 
    let lsUser = JSON.parse(localStorage.getItem('currentUser')); 

    this.employee.first_name = lsEmployee.first_name;
    this.employee.last_name = lsEmployee.last_name;
    this.employee.email = lsUser.email;

  }

}
