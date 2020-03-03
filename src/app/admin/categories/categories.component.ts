import { Component, OnInit } from '@angular/core';
import { datatableCategories, addTableCategory } from '../../../assets/util/js/datatable';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { hideSidenav } from '../../../assets/util/js/sidenav';
import { sweetAlert } from '../../../assets/util/js/alert';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: Category;

  constructor(
    private categoryService: CategoryService
  ) { 

    this.category = new Category('', '');

  }

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {

    this.categoryService.getCategories().subscribe(
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
          element.description, 
          `
            <span onclick="localStorage.setItem('categoryId', ${element.id})" class="action-edit"><i class="feather icon-edit"></i></span>
            <span onclick="localStorage.setItem('categoryId', ${element.id})" class="action-delete"><i class="feather icon-trash"></i></span>
          `
        ])
      }
    });

    datatableCategories(array);

  }

  registrarCategoria() {

    let data = {
      name: this.category.name,
      description: this.category.description,
    }

    console.log(data)

    this.categoryService.saveCategory(data).subscribe(
      response => {
        console.log('response', response)
        addTableCategory({
          id: response.id,
          name: response.name, 
          description: response.description, 
        })
        sweetAlert('Exito', 'Registrado', 'success')
      },
      error => {
        console.log('error', error)
      }
    )

  }

  actualizarCategoria(name, description) {

    let data = {
      "name": name.value,
      "description": description.value,
    }

    console.log(data)

    this.categoryService.updateCategory(parseInt(localStorage.getItem('categoryId')), data).subscribe(
      response => {
        console.log('response', response)
        hideSidenav('sn-edit-category', 'bg-edit-category')
      },
      error => {
        console.log('error', error)
      }
    )

  }


 
}
