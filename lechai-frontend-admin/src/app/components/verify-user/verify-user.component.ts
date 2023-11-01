
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { ToastService } from 'src/app/services/toast.service';
import { RouteTypes, RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { Services } from 'src/app/services/services.service';
import { APICallerService, UserInfoBundle } from 'src/app/apicaller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent {
  @ViewChild('token', { static: true }) token?: ElementRef;
  loginSubscription:  Subscription | undefined;
  userName: string = "";

  constructor(private fb: FormBuilder, private toast: ToastService, private router: Router,
    private routingService:RoutingService, private footerPosition:FooterPositionService, /* private connexion:Services */ private caller: APICallerService){

  }

  ngOnInit(): void{
    this.footerPosition.setIsAbsolute(true)
  }



  checkToken(){
    const token = (this.token?.nativeElement as HTMLSelectElement).value;

    if (this.loginSubscription)
        this.loginSubscription.unsubscribe()

    this.loginSubscription = this.caller.ConnexionStepTwo(token).subscribe((data: string | null | UserInfoBundle) => {
        // Handle successful response here
        if(data != null){
          this.toast.showToast("success", 'Vous êtes connecté!', "bottom-center", 4000);
          if(typeof data === "string")
          {
            this.caller.setToken(data);
            this.caller.setUserName("Alberto");
          }
        else
        {
          this.caller.setToken(data.token);
          this.caller.setUserName(data.name);
        }

          /* this.connexion.expirationToken(); */
          this.router.navigate([""]);
        }
        else
        {
          this.toast.showToast("error", 'Le code fourni ne correspond pas à celui envoyé au courriel.', "bottom-center", 4000);
          console.error('Status code:', HttpErrorResponse);
        }
    });
  }
}


