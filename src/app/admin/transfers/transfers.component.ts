import { Component, OnInit, DoCheck } from '@angular/core';
import { KardexService } from 'src/app/services/kardex.service';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Warehouse } from 'src/app/models/warehouse';
import { datatableAlmacen } from '../../../assets/util/js/datatable';
import { SubsidiaryService } from 'src/app/services/subsidiary.service';
import { hideSidenav } from '../../../assets/util/js/sidenav';
import { sweetAlert } from '../../../assets/util/js/alert';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

  data: Array<any> = [];
  warehouse: Warehouse;

  inventario = "";
  cantidad = "";
  subsidiaryId = "";
  sedeId = "";
  date = "";

  sucursales = [];
  seats = [];

  constructor(
    private kardexService: KardexService,
    private warehouseService: WarehouseService,
    private subsidiaryService: SubsidiaryService,
    private seatService: SeatService

  ) { 
    this.warehouse = new Warehouse('', '', '', '', '', '');
    this.data = []
  }

  ngOnInit() {
    this.obtenerSedes();
    // this.obtenerSucursales();
    this.obtenerInventario();

  }

  ngDoCheck() {
    this.inventario = localStorage.getItem('inventoryId')
  }

  registrarTransferencia() {

    if (this.cantidad == "" || this.cantidad == null || this.cantidad == undefined ||
    this.subsidiaryId == "" || this.subsidiaryId == null || this.subsidiaryId == undefined ||
    this.cantidad == "" || this.cantidad == null || this.cantidad == undefined ||
    this.date == "" || this.date == null || this.date == undefined) {
      sweetAlert('Informativo', 'Campos imcompletos', 'info')
    } else {
      let data = {
        transfer: {
          register_date: this.date,
          destination: this.subsidiaryId
        },
        detail_transfer: [
          {
            inventory_id: this.inventario,
            quantity: this.cantidad
          }
        ]
      }
  
      this.kardexService.saveKardex(data).subscribe(
        response => {
          console.log('response', response)
          hideSidenav('sn-transfer', 'bg-transfer')
          sweetAlert('Exito', 'Transferencia Realizada', 'success')

        },
        error => {
          console.log('error', error)
          sweetAlert('Error', 'Error en el Servidor', 'error')

        }
      )

    }
  }

  seleccionarSede(id) {
    this.subsidiaryService.getSubsidiariesBySede(id.value).subscribe(
      response => {
        console.log('response', response)
        response.forEach(element => {
          this.sucursales.push(element)
        });
      },
      error => {
        console.log('error', error)
      }
    )
  }

  obtenerSedes() {
    this.seatService.getSeats().subscribe(

      response => {
        console.log('response', response)
        response.forEach(element => {
          this.seats.push(element)
        });
      },
      error => {
        console.log('error', error)
      }

    )
  }

  obtenerSucursales() {

    this.subsidiaryService.getSubsidiaries().subscribe(
      response => {
        console.log('response', response)
        response.forEach(element => {
          if(element.active == 1) {
            this.sucursales.push(element);
          }
        });
      },
      error => {
        console.log('error', error)
      }
    )

  }

  obtenerInventario() {

    this.warehouseService.getWarehouses().subscribe(
      response => {
        console.log('response', response)
        this.establecerDatos(response)
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
          element.product.description, 
          element.stock, 
          element.cost, 
          element.entry_date, 
          element.entry_date, 
          `<button onclick="localStorage.setItem('inventoryId', ${element.id})" type="button" class="kardex action-add btn btn-dark mr-1 mb-1">Transferir</button>`
        ])
      }
    });

    datatableAlmacen(array);

  }

  obtenerKardex() {

    this.kardexService.getKardex().subscribe(
      response => {
        console.log('response', response)
      },
      error => {
        console.log('error', error)
      }
    )

  }

}
