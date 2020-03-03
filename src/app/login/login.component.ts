import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { AuthenticationService } from '../services/authentication.service';
import { swiper } from '../../assets/util/js/swiper';
import { SubsidiaryService } from '../services/subsidiary.service';
import { CompanyService } from '../services/company.service';
import { SeatService } from '../services/seat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  employee: Employee;
  errorMessage: String = '';
  messageButton: String = 'INGRESAR';
  loading: Boolean = false;
  nextLogin: Boolean = false;

  sucursales = [];
  companias = [];
  sedes = [];

  subsidiaryId: number = 0;
  seatId: number = 0;
  companyId: number = 0;

  constructor(

    private router: Router,
    private authService: AuthenticationService,
    private subsidiaryService: SubsidiaryService,
    private companyService: CompanyService,
    private seatService: SeatService

  ) {
    this.employee = new Employee(0, '', '', new Date(), '', '', '', [0]);


  }

  ngOnInit() {

    this.isAuth();
    swiper();
    this.obtenerCompanias();

  }

  isAuth() {

    const auth = localStorage.getItem('auth');

    if (auth === 'true') {

      this.router.navigate(['/dashboard']);

    }

  }

  ingresar() {

    this.messageButton = 'VERIFICANDO';

    if (
      this.employee.email == '' || this.employee.email == null || this.employee.email == undefined ||
      this.employee.password == '' || this.employee.password == null || this.employee.password == undefined
    ) {

      this.errorMessage = 'Ingrese Correo y Contraseña';
      this.messageButton = 'INGRESAR';

    } else {

      this.authService.login(this.employee).subscribe(
        response => {

          console.log('response', response)
          this.messageButton = 'INGRESAR';
          this.nextLogin = true;

        },
        error => {

          console.log('error', error)
          this.messageButton = 'INGRESAR';

        }
      )
    }

  }

  obtenerSucursales() {

    this.subsidiaryService.getSubsidiaries().subscribe(
      response => {
        console.log('response', response)
        this.sucursales = response;
      },
      error => {
        console.log('error', error)
      }
    )

  }

  seleccionarSucursal() {

    if (this.subsidiaryId == 0) {
      alert('seleccionar sucursal')
    } else {

      let user = JSON.parse(localStorage.getItem('currentUser'));


      this.subsidiaryService.selectSubsidiary(user.employee_id, { office_id: this.subsidiaryId, company_id: this.companyId }).subscribe(
        response => {
          console.log('response', response);
          localStorage.setItem('company_login', response.company_login);
          localStorage.setItem('office_login', response.office_login);

          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log('error', error);
        }

      )

    }

  }

  obtenerCompanias() {
    
    this.companyService.getCompanies().subscribe(
      response => {
        console.log('response', response)
        response.forEach(element => {
          if(element.active == 1) {
            this.companias.push(element)
          }
        });
      },
      error => {
        console.log('error', error)
      }
    )

  }

  obtenerSedesPorCompania(id) {

    this.seatService.getSeatsByCompany(id).subscribe(
      response => {
        response.forEach(element => {
          if(element.active == 1) {
            this.sedes.push(element)
          }
        });
        console.log('response', response)
      },
      error => {
        console.log('error', error)
      }
    )

  }

  obtenerSucursalesPorSede(id) {

    this.subsidiaryService.getSubsidiariesBySede(id).subscribe(
      response => {
        response.forEach(element => {
          if(element.active == 1) {
            this.sucursales.push(element)
          }
        });
        console.log('response', response)
      },
      error => {
        console.log('error', error)
      }
    )

  }

  seleccionarCompania(compania) {
    this.obtenerSedesPorCompania(compania);
  }

  seleccionarSede(sede) {
    this.obtenerSucursalesPorSede(sede);
  }

}
