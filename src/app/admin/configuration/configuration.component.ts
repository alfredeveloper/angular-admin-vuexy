import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { SeatService } from 'src/app/services/seat.service';
import { SubsidiaryService } from 'src/app/services/subsidiary.service';
import { sweetAlert } from '../../../assets/util/js/alert';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  companyId = 0;
  seatId = 0;
  subsidiaryId = 0;

  companias = [];
  sedes = [];
  sucursales = [];

  constructor(

    private companyService: CompanyService,
    private seatService: SeatService,
    private subsidiaryService: SubsidiaryService

  ) { }

  ngOnInit() {
    this.obtenerCompanias();
  }

  obtenerCompanias(): void {
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

  seleccionarCompania(id) {
    this.seatService.getSeatsByCompany(id).subscribe(
      response => {
        console.log('response', response)
        response.forEach(element => {
          if(element.active == 1) {
            this.sedes.push(element)
          }
        });
      },
      error => {
        console.log('error', error)
      }
    )
  }

  seleccionarSede(id) {
    this.subsidiaryService.getSubsidiariesBySede(id).subscribe(
      response => {
        console.log('response', response)
        response.forEach(element => {
          if(element.active == 1) {
            this.sucursales.push(element)
          }
        });
      },
      error => {
        console.log('error', error)
      }
    )
  }

  guardarCambios(): void {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    this.subsidiaryService.selectSubsidiary(user.employee_id, { office_id: this.subsidiaryId, company_id: this.companyId }).subscribe(
      response => {
        console.log('response', response);
        localStorage.setItem('company_login', response.company_login);
        localStorage.setItem('office_login', response.office_login);
        sweetAlert('Exito', 'Cambios Guardados', 'success');
      },
      error => {
        console.log('error', error);
        sweetAlert('Error', 'Error en el servidor', '')
      }

    )
  }
  

}
