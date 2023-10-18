import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FiltreInputComponent } from './components/page-principale/filtre-input/filtre-input.component';
import { FiltreSelectComponent } from './components/page-principale/filtre-select/filtre-select.component';
import { NavComponent } from './components/nav/nav.component';
import { PagePrincipaleComponent } from './components/page-principale/page-principale.component';
import { FooterComponent } from './components/footer/footer.component';
import { Page404Component } from './components/page404/page404.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { MdpOublierEnvoiComponent } from './components/mdp-oublier-envoi/mdp-oublier-envoi.component';
import { SelectionControlleurComponent } from './components/page-principale/selection-controlleur/selection-controlleur.component';

import { Services } from './services/services.service';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltreInputComponent,
    FiltreSelectComponent,
    NavComponent,
    PagePrincipaleComponent,
    Page404Component,
    FooterComponent,
    ConnexionComponent,
    MdpOublierEnvoiComponent,
    SelectionControlleurComponent,
    VerifyUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
