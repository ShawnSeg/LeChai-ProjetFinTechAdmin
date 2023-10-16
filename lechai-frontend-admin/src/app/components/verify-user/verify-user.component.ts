
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RouteTypes, RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { Services } from 'src/app/services/services.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent {
  @ViewChild('token', { static: true }) token?: ElementRef;

  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router,
    private routingService:RoutingService, private footerPosition:FooterPositionService, private connexion:Services){

  }

  ngOnInit(): void{
    this.footerPosition.setIsAbsolute(true)
  }



  checkToken(){

    const token = (this.token?.nativeElement as HTMLSelectElement).value;

    this.routingService.callAPIRouteURL(RouteTypes.POST,{"Token": token}, "Employes", "ConnexionStepTwo").subscribe({
      next: (data: any) => {
        // Handle successful response here
        this.toast.showToast("success", 'Vous êtes connecté!', "bottom-center", 4000);
        this.connexion.setToken(data);
        /* this.connexion.expirationToken(); */
        this.router.navigate([""]);
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
        this.toast.showToast("error", 'Le code fourni ne correspond pas à celui envoyé au courriel.', "bottom-center", 4000);
        console.error('Status code:', error.status);

      }
    });

  }
}


