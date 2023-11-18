//import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { AppRoutingModule } from './app-routing.module';
//import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { PagePrincipaleComponent } from './components/page-principale/page-principale.component';
import { FooterComponent } from './components/footer/footer.component';
import { Page404Component } from './components/page404/page404.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { MdpOublierEnvoiComponent } from './components/mdp-oublier-envoi/mdp-oublier-envoi.component';

import { Services } from './services/services.service';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
/* import { ProprietyTableComponent } from './components/page-principale/propriety-table/propriety-table.component'; */
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
import { CheckBoxDisplayItemComponent } from './components/displayItem/check-box-display-item/check-box-display-item.component';
import { RoueCouleurDisplayItemComponent } from './components/displayItem/roue-couleur-display-item/roue-couleur-display-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PagePrincipaleComponent,
    Page404Component,
    FooterComponent,
    ConnexionComponent,
    MdpOublierEnvoiComponent,
    VerifyUserComponent,
/*     ProprietyTableComponent, */
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
    ImageDisplayItemComponent,
    CheckBoxDisplayItemComponent,
    RoueCouleurDisplayItemComponent

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
