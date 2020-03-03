import { Component, OnInit } from '@angular/core';
import { datatableSeats, addTableSeat } from '../../../assets/util/js/datatable';
import { SeatService } from 'src/app/services/seat.service';
import { Seat } from 'src/app/models/seat';
import { hideSidenav } from '../../../assets/util/js/sidenav';
import { SubsidiaryService } from 'src/app/services/subsidiary.service';
import { CompanyService } from 'src/app/services/company.service';
import { sweetAlert } from '../../../assets/util/js/alert';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  data: Array<any> = [];
  seat: Seat;
  companies = [];
  companyId: number = 0;

  constructor(
    private seatService: SeatService,
    private companyService: CompanyService
  ) { 
    this.seat = new Seat('', '','');
  }

  ngOnInit() {

    this.obtenerSedes();
    this.obtenerCompanies();

  }

  obtenerSedes(): void {

    this.seatService.getSeats().subscribe(
      response => {
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
      
      let active = '';
      
      if(element.active == 0) {
        active = `
        <div class="chip chip-warning">
          <div class="chip-body">
              <div class="chip-text">Inactivo</div>
          </div>
        </div>
        `;
      }else {
        active = `
        <div class="chip chip-success">
          <div class="chip-body">
              <div class="chip-text">Activo</div>
          </div>
        </div>
        `;
      }
      if(element.active == 1) {
        array.push([
          element.id, 
          element.company_id, 
          element.ubigeo, 
          element.name, 
          active,
          `
            <span onclick="localStorage.setItem('seatId', ${element.id})" class="action-edit"><i class="feather icon-edit"></i></span>
            <span onclick="localStorage.setItem('seatId', ${element.id})" class="action-delete"><i class="feather icon-trash"></i></span>
          `
        ])
      }
    });

    datatableSeats(array);

  }

  guardarSede() {
    
    if(this.seat.company_id == "" || this.seat.company_id == "" || this.seat.company_id == "" ||
    this.seat.ubigeo == "" ||this.seat.ubigeo == "" ||this.seat.ubigeo == "" ||
    this.seat.name == "" ||this.seat.name == "" ||this.seat.name == "" ) {
      sweetAlert('Informativo', 'Ingresar todos los campos', 'info')
    } else {
      let data = {
        company_id: parseInt(this.seat.company_id),
        ubigeo: this.seat.ubigeo,
        name: this.seat.name
      }
  
  
      this.seatService.saveSeat(data).subscribe(
        response => {
          console.log('response', response)
          addTableSeat({
            id: response.id,
            company_id: response.company_id, 
            ubigeo: response.ubigeo, 
            name: response.name,
            active: response.active
          })
          sweetAlert('Exito', 'Sede Registrada', 'success')

        },
        error => {
          console.log('error', error)
          sweetAlert('Error', 'Error en el Servidor', 'error')

        }
      )

    }


  }

  editarSede(company, ubigeo, name) {

    if(this.seat.company_id == "" || this.seat.company_id == "" || this.seat.company_id == "" ||
    this.seat.ubigeo == "" ||this.seat.ubigeo == "" ||this.seat.ubigeo == "" ||
    this.seat.name == "" ||this.seat.name == "" ||this.seat.name == "" ) {
      sweetAlert('Informativo', 'Ingresar todos los campos', 'info')
    } else {
      let data = {
        "company_id": company.value,
        "ubigeo": ubigeo.value,
        "name": name.value
      }
  
      console.log(data)
  
      this.seatService.updateSeat(parseInt(localStorage.getItem('seatId')), data).subscribe(
        response => {
          console.log('response', response)
          hideSidenav('edit-seat', 'bg-seat')
          sweetAlert('Exito', 'Sede Actualizada', 'success')

        },
        error => {
          console.log('error', error)
          sweetAlert('Error', 'Error en el servidor', 'error')

        }
      )

    }

  }

  obtenerCompanies() {

    this.companyService.getCompanies().subscribe(
      response => {
        console.log('response', response)
        response.forEach(element => {
          if(element.active == 1) {
            this.companies.push(element)
          }
        });
      },
      error => {
        console.log('error', error)
      }
    )

  }

}
