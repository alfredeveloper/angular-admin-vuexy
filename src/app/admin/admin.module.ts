import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shareds/shared.module';

import { ADMIN_ROUTES } from './admin.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginGuard } from '../guards/login.guard';
import { EmployeesComponent } from './employees/employees.component';
import { SeatsComponent } from './seats/seats.component';
import { SubsidiariesComponent } from './subsidiaries/subsidiaries.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CompaniesComponent } from './companies/companies.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SupliersComponent } from './supliers/supliers.component';
import { CategoriesComponent } from './categories/categories.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductsComponent } from './products/products.component';
import { TransfersComponent } from './transfers/transfers.component';
import { WarehouseSecondaryComponent } from './warehouse-secondary/warehouse-secondary.component';

@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        EmployeesComponent,
        SeatsComponent,
        SubsidiariesComponent,
        ConfigurationComponent,
        CompaniesComponent,
        EditProfileComponent,
        PurchaseComponent,
        SupliersComponent,
        CategoriesComponent,
        WarehouseComponent,
        ProductsComponent,
        TransfersComponent,
        WarehouseSecondaryComponent,
    ],
    exports: [
        DashboardComponent,
        AdminComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ADMIN_ROUTES,

    ],
    providers: [ LoginGuard ]
})

export class AdminModule {
    
}