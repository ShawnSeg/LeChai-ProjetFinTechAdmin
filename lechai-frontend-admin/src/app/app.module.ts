import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FiltreInputComponent } from './components/page-principale/filtre-container/filtres-niv2/filtre-input/filtre-input.component';
import { FiltreSelectComponent } from './components/page-principale/filtre-container/filtres-niv2/filtre-select/filtre-select.component';
import { NavComponent } from './components/nav/nav.component';
import { PagePrincipaleComponent } from './components/page-principale/page-principale.component';
import { FooterComponent } from './components/footer/footer.component';
import { Page404Component } from './components/page404/page404.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { MdpOublierEnvoiComponent } from './components/mdp-oublier-envoi/mdp-oublier-envoi.component';
import { SelectionControlleurComponent } from './components/page-principale/selection-controlleur/selection-controlleur.component';

import { Services } from './services/services.service';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { FiltreContainerComponent } from './components/page-principale/filtre-container/filtre-container.component';
import { FiltreResumeComponent } from './components/page-principale/filtre-container/filtre-header/filtre-resume/filtre-resume.component';
import { FiltreMinMaxComponent } from './components/page-principale/filtre-container/filtres-niv2/filtre-min-max/filtre-min-max.component';
import { FiltresNiv2Component } from './components/page-principale/filtre-container/filtres-niv2/filtres-niv2.component';
import { FiltreHeaderComponent} from './components/page-principale/filtre-container/filtre-header/filtre-header.component';
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
    FiltreContainerComponent,
    FiltreResumeComponent,
    FiltreMinMaxComponent,
    FiltresNiv2Component,
    FiltreHeaderComponent
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
