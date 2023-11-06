
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { ToastService } from 'src/app/services/toast.service';
import { RouteTypes, RoutingService } from 'src/app/services/routing.service';
import { group } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observer, Subscription } from 'rxjs';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { Services } from 'src/app/services/services.service';
import { APICallerService } from 'src/app/apicaller.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  passType: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  showForm = false;
  hideForm = true
  loginSubscription:  Subscription | undefined;

  loginForm!: FormGroup;




  constructor(private fb: FormBuilder, private toast: ToastService, private router: Router,  private routingSevice:RoutingService,
              private http:HttpClient, private footerPosition:FooterPositionService,  /* private connexion: Services */ private caller: APICallerService){


  }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      courriel: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.footerPosition.setIsAbsolute(false)
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.passType = "text" : this.passType = "password";
  }

  onLogin(){
    if(this.loginForm.valid)
    {
      if (this.loginSubscription)
        this.loginSubscription.unsubscribe()

      this.loginSubscription = this.caller.ConnexionStepOne(this.loginForm.get('courriel')!.value, this.loginForm.get('password')!.value).subscribe((data: boolean) => {
        if(data){
          this.router.navigate([`/checkClient`]);
          this.loginForm.reset();
        }
        else
        {
          this.toast.showToast("error", 'Le courriel ou le mot de passe est incorecte.', "bottom-center", 4000);
          console.error('Status code:', HttpErrorResponse);
        }
      })
    }
    else{
      ValidationInput.validationInput(this.loginForm);
      this.toast.showToast("error", "Les valeurs entrées ne respectent pas les règles.", "bottom-center", 4000);
    }

  }



  toggleForm(){
    if(this.showForm)
    {
      this.showForm=false;
      setTimeout(() => {
        this.hideForm = true;
      }, 500);

    }
    else
    {
      this.showForm=true;
      this.hideForm = false;
    }
  }


}
