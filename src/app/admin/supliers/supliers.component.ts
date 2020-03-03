import { Component, OnInit } from '@angular/core';
import { datatableSuppliers, addTableSuppliers } from '../../../assets/util/js/datatable';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from 'src/app/models/supplier';
import { hideSidenav } from '../../../assets/util/js/sidenav';
import { sweetAlert } from '../../../assets/util/js/alert';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {

  supplier: Supplier;

  constructor(
    private supplierService: SupplierService
  ) { 

    this.supplier = new Supplier('', '', '', '', '', '');
  
  }

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {

    this.supplierService.getSuppliers().subscribe(
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
      if(element.active == 1) {
        array.push([
          element.id, 
          element.name, 
          element.ruc, 
          element.address, 
          element.email, 
          element.phone,  
          `
            <span class="action-edit" onclick="localStorage.setItem('supplierId', ${element.id})"><i class="feather icon-edit"></i></span>
            <span class="action-delete" onclick="localStorage.setItem('supplierId', ${element.id})"><i class="feather icon-trash"></i></span>
          `
        ])

      }
    });

    datatableSuppliers(array);

  }

  agregarProveedor() {

    if(
      this.supplier.name == "" || this.supplier.name == null || this.supplier.name == undefined ||
      this.supplier.ruc == "" || this.supplier.ruc == "" ||this.supplier.ruc == "" ||
      this.supplier.district_id == "" ||this.supplier.district_id == "" ||this.supplier.district_id == "" ||
      this.supplier.address == "" ||this.supplier.address == "" ||this.supplier.address == "" ||
      this.supplier.email == "" ||this.supplier.email == "" ||this.supplier.email == "" ||
      this.supplier.phone == "" ||this.supplier.phone == "" ||this.supplier.phone == ""
      ) {
        sweetAlert('Informativo', 'Campos Incompletos', 'info')
    } else {
      let data = {
        name: this.supplier.name,
        ruc: this.supplier.ruc,
        district_id: parseInt(this.supplier.district_id),
        address: this.supplier.address,
        email: this.supplier.email,
        phone: this.supplier.phone,
      }
  
      console.log(data)
  
      this.supplierService.saveSupplier(data).subscribe(
        response => {
          console.log('response regs', response)
          addTableSuppliers({
            id: response.supplier.id,
            name: response.supplier.name, 
            ruc: response.supplier.ruc, 
            address: response.supplier.address, 
            email: response.supplier.email,
            phone: response.supplier.phone
          })
  
          sweetAlert('Exito', 'Proveedor Registrado', 'success')
  
        },
        error => {
          console.log('error', error)
          sweetAlert('Error', 'Error en el Servidor', 'error')
          
        }
      )
    }

  }

  actualizarProveedor(name, ruc, district_id, address, email, phone) {
    if(
      name.value == "" || name.value == null || name.value == undefined ||
      ruc.value == "" || ruc.value == "" || ruc.value == "" ||
      district_id.value == "" || district_id.value == "" || district_id.value == "" ||
      address.value == "" || address.value == "" || address.value == "" ||
      email.value == "" || email.value == "" || email.value == "" ||
      phone.value == "" || phone.value == "" || phone.value == ""
      ) {
        sweetAlert('Informativo', 'Campos Incompletos', 'info')
    }else {
      let data = {
        "name": name.value,
        "ruc": ruc.value,
        "district_id": district_id.value,
        "address": address.value,
        "email": email.value,
        "phone": phone.value
      }
  
      console.log(data)
  
      this.supplierService.updateSupplier(parseInt(localStorage.getItem('supplierId')), data).subscribe(
        response => {
          console.log('response', response)
          hideSidenav('sn-edit-supplier', 'bg-edit-supplier')
          sweetAlert('Exito', 'Proveedor Actualizado', 'success')

        },
        error => {
          console.log('error', error)
          sweetAlert('Error', 'Error en el servidor', 'error')
        }
      )

    }

  }

  
}
