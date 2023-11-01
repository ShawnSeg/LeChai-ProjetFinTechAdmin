//import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutingModule } from './app-routing.module';
//import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { AppComponent } from './app.component';
import { FiltreInputComponent } from './components/page-principale/filtre-container/filtres-niv2/filtre-input/filtre-input.component';
import { FiltreSelectComponent } from './components/page-principale/filtre-container/filtres-niv2/filtre-select/filtre-select.component';
import { NavComponent } from './components/nav/nav.component';
import { PagePrincipaleComponent } from './components/page-principale/page-principale.component';
import { FooterComponent } from './components/footer/footer.component';
import { Page404Component } from './components/page404/page404.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { MdpOublierEnvoiComponent } from './components/mdp-oublier-envoi/mdp-oublier-envoi.component';

import { Services } from './services/services.service';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
/* import { ProprietyTableComponent } from './components/page-principale/propriety-table/propriety-table.component'; */


import { FiltreContainerComponent } from './components/page-principale/filtre-container/filtre-container.component';
import { FiltreResumeComponent } from './components/page-principale/filtre-container/filtre-header/filtre-resume/filtre-resume.component';
import { FiltreMinMaxComponent } from './components/page-principale/filtre-container/filtres-niv2/filtre-min-max/filtre-min-max.component';
import { FiltresNiv2Component } from './components/page-principale/filtre-container/filtres-niv2/filtres-niv2.component';
import { FiltreHeaderComponent} from './components/page-principale/filtre-container/filtre-header/filtre-header.component';
/* import { RowsDataComponent } from './components/page-principale/propriety-table/rows-data/rows-data.component'; */


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControllersComponent } from './components/page-principale/controllers/controllers.component';
import { FiltresComponent } from './components/page-principale/filtres/filtres.component';
import { DataDisplayComponent } from './components/page-principale/data-display/data-display.component';
import { HttpClientModule } from '@angular/common/http';
//import { MainPageComponent } from './main-page/main-page.component';
import { DisplayItemContainerComponent } from './components/page-principale/display-item-container/display-item-container.component';
import { StringDisplayItemComponent } from './components/displayItem/string-display-item/string-display-item.component';



import { ListeDeroulanteCustomComponent } from './components/page-principale/liste-deroulante-custom/liste-deroulante-custom.component';

import { DeleteItemsComponent } from './display-item-container/delete-items/delete-items.component';
import { RefDisplayItemComponent } from './components/displayItem/ref-display-item/ref-display-item.component';
import { CboDisplayItemComponent } from './components/displayItem/cbo-display-item/cbo-display-item.component';
import { IntDisplayItemComponent } from './components/displayItem/int-display-item/int-display-item.component';
import { FloatDisplayItemComponent } from './components/displayItem/float-display-item/float-display-item.component';
import { DescriptionDisplayItemComponent } from './components/displayItem/description-display-item/description-display-item.component';
import { DateDisplayItemComponent } from './components/displayItem/date-display-item/date-display-item.component';
import { ImageDisplayItemComponent } from './components/displayItem/image-display-item/image-display-item.component';
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
    VerifyUserComponent,
/*     ProprietyTableComponent, */
    FiltreContainerComponent,
    FiltreResumeComponent,
    FiltreMinMaxComponent,
    FiltresNiv2Component,
    FiltreHeaderComponent,
/*     RowsDataComponent, */
    ListeDeroulanteCustomComponent,


    AppComponent,
    ControllersComponent,
    FiltresComponent,
    DataDisplayComponent,
    //MainPageComponent,
    DisplayItemContainerComponent,
    StringDisplayItemComponent,
    RefDisplayItemComponent,
    CboDisplayItemComponent,
    DeleteItemsComponent,
    IntDisplayItemComponent,
    FloatDisplayItemComponent,
    DescriptionDisplayItemComponent,
    DateDisplayItemComponent,
    ImageDisplayItemComponent

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
