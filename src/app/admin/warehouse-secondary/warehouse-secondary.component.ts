import { Component, OnInit } from '@angular/core';
import { datatableAlmacen } from '../../../assets/util/js/datatable';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-secondary',
  templateUrl: './warehouse-secondary.component.html',
  styleUrls: ['./warehouse-secondary.component.css']
})
export class WarehouseSecondaryComponent implements OnInit {

  data: Array<any> = [];
  warehouse: Warehouse;

  constructor(
    private warehouseService: WarehouseService

  ) { 
    this.warehouse = new Warehouse('', '', '', '', '', '');
    this.data = []
  }

  ngOnInit() {
    this.obtenerInventario();

  }

  obtenerInventario() {

    this.warehouseService.getWarehousesSubsidiary().subscribe(
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
          `<button onclick="localStorage.setItem('inventoryId', ${element.id})" type="button" class="kardex action-add btn btn-dark mr-1 mb-1">Kardex</button>`
        ])
      }
    });

    datatableAlmacen(array);

  }
}
