import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagePrincipaleComponent } from './components/page-principale/page-principale.component';
import { Page404Component } from './components/page404/page404.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

const routes: Routes = [

  {path: 'connexion', component: ConnexionComponent},
  {path: 'checkClient', component:VerifyUserComponent},
  //{ path: '', redirectTo: 'Produits', pathMatch: 'full' }, // Redirection par défaut devra etre connexion puis une fois loger on se dirige vers Produits!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //{ path: ':name', component: PagePrincipaleComponent },
  { path: '', redirectTo: '/0', pathMatch: 'full' },
  { path: ':controllerName', component: PagePrincipaleComponent },
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
