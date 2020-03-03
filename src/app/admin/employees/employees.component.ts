import { Component, OnInit } from '@angular/core';
import { datatableEmployees } from '../../../assets/util/js/datatable';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  data: Array<any> = [];
  employee: Employee;

  constructor(
    private employeeService: EmployeeService
  ) { 

    this.employee = new Employee(0, '', '', new Date, '', '', '', []);
  
  }

  ngOnInit() {
    this.obtenerEmpleados();

  }

  obtenerEmpleados(): void {

    this.employeeService.getEmployees().subscribe(
      response => {
        console.log('response', response)
        this.establecerDatos(response);
      },
      error => {
        console.log('error', error)

      }
    )

  }

  establecerDatos(data): void {
    let array = []
    data.forEach(element => {
      array.push([
        '', 
        element.dni, 
        element.first_name, 
        element.last_name, 
        element.birthday, 
        element.email, 
        element.phone, 
        element.active, 
        `
          <span class="action-edit"><i class="feather icon-edit"></i></span>
          <span class="action-delete"><i class="feather icon-trash"></i></span>
        `
      ])
    });

    datatableEmployees(array);

  }

  registrarEmpleado() {
    console.log('employee', this.employee)
    return true;
    this.employeeService.saveEmployee(this.employee).subscribe(
      response => {
        console.log('responsse', response)
      },
      error => {
        console.log('error', error)
      }
    )
  }
}
