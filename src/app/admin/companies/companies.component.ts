import { Component, OnInit } from '@angular/core';
import { datatableCompanies, addTableCompany } from '../../../assets/util/js/datatable';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import { hideSidenav } from '../../../assets/util/js/sidenav';
import { sweetAlert } from '../../../assets/util/js/alert';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  data: Array<any> = [];
  company: Company

  constructor(
    private companyService: CompanyService,
  ) { 

    this.company = new Company('', '', '', '');
   
  }

  ngOnInit() {

    this.obtenerCompanias();

  }

  obtenerCompanias(): void {

    this.companyService.getCompanies().subscribe(
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
          element.ruc, 
          element.name, 
          element.trade_name, 
          element.address, 
          `
            <span class="action-edit" onclick="localStorage.setItem('companyId', ${element.id})"><i class="feather icon-edit"></i></span>
            <span class="action-delete" onclick="localStorage.setItem('companyId', ${element.id})"><i class="feather icon-trash"></i></span>
          `
        ])
      }
    });

    datatableCompanies(array);

  }

  registrarCompania() {

    if(
      this.company.name == "" || this.company.name == null || this.company.name == undefined ||
      this.company.ruc == "" || this.company.ruc == "" || this.company.ruc == "" ||
      this.company.address == "" || this.company.address == "" || this.company.address == "" ||
      this.company.trade_name == "" || this.company.trade_name == "" || this.company.trade_name == "" 
    ) {
      sweetAlert('Informativo', 'Ingresar todos los campos', 'info')
    } else {
      let data = {
        name: this.company.name,
        trade_name: this.company.trade_name,
        address: this.company.address,
        ruc: this.company.ruc,
      }
  
      console.log(data)
  
      this.companyService.saveCompany(data).subscribe(
        response => {
          console.log('response', response)
          addTableCompany({
            id: response.id,
            name: response.name, 
            trade_name: response.trade_name, 
            address: response.address, 
            ruc: response.ruc, 
          })
          sweetAlert('Exito', 'Compaía Registrada', 'success')

        },
        error => {
          console.log('error', error)
          sweetAlert('Error', 'Error en el Servidor', 'error')

        }
      )

    }


  }


  editarCompania(name, ruc, trade_name, address) {

    if(
      name.value == "" || name.value == null || name.value == undefined ||
      ruc.value == "" || ruc.value == "" || ruc.value == "" ||
      trade_name.value == "" || trade_name.value == "" || trade_name.value == "" ||
      address.value == "" || address.value == "" || address.value == "" 
    ) {
      sweetAlert('Informativo', 'Ingresar todos los campos', 'info')
    }
    else {
      let data = {
        "name": name.value,
        "ruc": ruc.value,
        "trade_name": trade_name.value,
        "address": address.value,
      }
  
      console.log(data)
  
      this.companyService.updateCompany(parseInt(localStorage.getItem('companyId')), data).subscribe(
        response => {
          console.log('response', response)
          hideSidenav('edit-company', 'bg-company')
          sweetAlert('Exito', 'Compañia actualizada', 'success')

        },
        error => {
          sweetAlert('Error', 'Error en el servidor', 'error')
         
          console.log('error', error)
        }
      )
      
    }

  }

  

}
