import { Routes, RouterModule } from '@angular/router';

// Impor user
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';


const AppRoutes: Routes = [

  { path: 'iniciar-sesion', component: LoginComponent },
  { path: '**', component: ErrorComponent },
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' }

];

export const APP_ROUTES = RouterModule.forRoot( AppRoutes, { useHash: true } );

// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
