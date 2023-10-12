import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagePrincipaleComponent } from './components/page-principale/page-principale.component';
import { Page404Component } from './components/page404/page404.component';
import { ConnexionComponent } from './components/connexion/connexion.component';

const routes: Routes = [
  {path: '', component: PagePrincipaleComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
