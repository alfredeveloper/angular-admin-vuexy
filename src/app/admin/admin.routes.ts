import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { LoginGuard } from '../guards/login.guard';
import { EmployeesComponent } from './employees/employees.component';
import { SeatsComponent } from './seats/seats.component';
import { SubsidiariesComponent } from './subsidiaries/subsidiaries.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CompaniesComponent } from './companies/companies.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SupplierService } from '../services/supplier.service';
import { SupliersComponent } from './supliers/supliers.component';
import { CategoriesComponent } from './categories/categories.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductsComponent } from './products/products.component';
import { TransfersComponent } from './transfers/transfers.component';
import { WarehouseSecondaryComponent } from './warehouse-secondary/warehouse-secondary.component';

const pagesRoutes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'empleados', component: EmployeesComponent, data: {titulo: 'Empleado'} },
      { path: 'proveedores', component: SupliersComponent, data: {titulo: 'Proveedores'} },
      { path: 'categorias', component: CategoriesComponent, data: {titulo: 'Categorías'} },
      { path: 'companias', component: CompaniesComponent, data: {titulo: 'Compañias'} },
      { path: 'sedes', component: SeatsComponent, data: {titulo: 'Sedes'} },
      { path: 'sucursales', component: SubsidiariesComponent, data: {titulo: 'Sucursales'} },
      { path: 'configuracion', component: ConfigurationComponent, data: {titulo: 'Configuración'} },
      { path: 'editar-perfil', component: EditProfileComponent, data: {titulo: 'EditarPerfil'} },
      { path: 'compras', component: PurchaseComponent, data: {titulo: 'Compras'} },
      { path: 'almacen-principal', component: WarehouseComponent, data: {titulo: 'Almacen Principal'} },
      { path: 'almacen-secundario', component: WarehouseSecondaryComponent, data: {titulo: 'Almacen Secundario'} },
      { path: 'productos', component: ProductsComponent, data: {titulo: 'Productos'} },
      { path: 'transferencias', component: TransfersComponent, data: {titulo: 'Transferencias'} },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
  
  ];

  export const ADMIN_ROUTES = RouterModule.forChild( pagesRoutes )