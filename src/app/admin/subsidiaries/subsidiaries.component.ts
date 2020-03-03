import { Component, OnInit } from '@angular/core';
import { datatableSubsidiaries, addTableSubsidiary } from '../../../assets/util/js/datatable';
import { SubsidiaryService } from 'src/app/services/subsidiary.service';
import { Subsidiary } from 'src/app/models/subsidiary';
import { hideSidenav } from '../../../assets/util/js/sidenav';
import { SeatService } from 'src/app/services/seat.service';
import { sweetAlert } from '../../../assets/util/js/alert';

@Component({
  selector: 'app-subsidiaries',
  templateUrl: './subsidiaries.component.html',
  styleUrls: ['./subsidiaries.component.css']
})
export class SubsidiariesComponent implements OnInit {

  data: Array<any> = [];
  subsidiary: Subsidiary;
  seats = [];
  seatId: number = 0;

  constructor(
    private subsidiaryService: SubsidiaryService,
    private seatService: SeatService
  ) { 

    this.subsidiary = new Subsidiary('', '', '', '');

  }

  ngOnInit() {
    this.obtenerSucursales();
    this.obtenerSedes();
  }

  obtenerSucursales(): void {

    this.subsidiaryService.getSubsidiaries().subscribe(
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
      if(element.active == 1) {
        array.push([
          element.id, 
          element.sede_id, 
          element.name, 
          element.address, 
          element.phone, 
          `
            <span onclick="localStorage.setItem('subsidiaryId', ${element.id})" class="action-edit"><i class="feather icon-edit"></i></span>
            <span onclick="localStorage.setItem('subsidiaryId', ${element.id})" class="action-delete"><i class="feather icon-trash"></i></span>
          `
        ])

      }
    });

    datatableSubsidiaries(array);

  }

  registrarSucursal() {
    if(
      this.subsidiary.sede_id == "" || this.subsidiary.sede_id == null || this.subsidiary.sede_id == undefined ||
      this.subsidiary.name == "" || this.subsidiary.name == null || this.subsidiary.name == undefined ||
      this.subsidiary.address == "" || this.subsidiary.address == null || this.subsidiary.address == undefined ||
      this.subsidiary.phone == "" || this.subsidiary.phone == null || this.subsidiary.phone == undefined
      ){
        sweetAlert('Informativo', 'Ingresar Todos los campos', '')

      }else {
        let data = {
          sede_id: parseInt(this.subsidiary.sede_id),
          name: this.subsidiary.name,
          address: this.subsidiary.address,
          phone: this.subsidiary.phone,
        }
    
        console.log(data)
    
        this.subsidiaryService.saveSubsidiary(data).subscribe(
          response => {
            console.log('response', response)
            addTableSubsidiary({
              id: response.id,
              sede_id: response.sede_id, 
              name: response.name, 
              address: response.address, 
              phone: response.phone
            })
            sweetAlert('Exito', 'Sucursal Registrada', 'success')

          },
          error => {
            console.log('error', error)
            sweetAlert('Error', 'Error en el servidor', 'error')

          }
        )

      }

  }

  actualizarSucursal(sede_id, name, address, phone) {
    if(
      sede_id.value == "" || sede_id.value == null || sede_id.value == undefined ||
      name.value == "" || name.value == null || name.value == undefined ||
      address.value == "" || address.value == null || address.value == undefined ||
      phone.value == "" || phone.value == null || phone.value == undefined
      ){
        sweetAlert('Informativo', 'Ingresar Todos los campos', '')

    } else {
      let data = {
        "sede_id": sede_id.value,
        "name": name.value,
        "address": address.value,
        "phone": phone.value
      }
  
      console.log(data)
  
      this.subsidiaryService.updateSubsidiary(parseInt(localStorage.getItem('subsidiaryId')), data).subscribe(
        response => {
          console.log('response', response)
          hideSidenav('edit-subsidiary', 'bg-subsidiary')
          sweetAlert('Exito', 'Sucursal Actualizada', 'success')
        },
        error => {
          console.log('error', error)
          sweetAlert('Error', 'Error en el Servidor', 'error')

        }
      )

    }


  }

  obtenerSedes() {

    this.seatService.getSeats().subscribe(
      response => {
        console.log('response', response)
        response.forEach(element => {
          if(element.active == 1) {
            this.seats.push(element)

          }
        });
      },
      error => {
        console.log('error', error)
      }
    )

  }

  

}
