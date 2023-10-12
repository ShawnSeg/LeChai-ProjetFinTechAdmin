
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ApiResponse } from 'src/Interface';
import { group } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observer } from 'rxjs';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { Services } from 'src/app/services/services.service';

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

  loginForm!: FormGroup;




  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router,  private routingSevice:RoutingService,
              private http:HttpClient, private footerPosition:FooterPositionService,  private connexion: Services){


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

      this.toast.showToast("success", "Connexion réussi.", "bottom-center", 4000);
      this.auth.setToken("tokenTemp");
      this.connexion.setConnected(true);
      this.router.navigate([""]);

      /* this.routingSevice.connexion(this.loginForm.get('courriel')!.value, this.loginForm.get('password')!.value).subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.router.navigate([`/checkClient`]);
          this.loginForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'il n\'existe pas de compte avec ce courriel et ce mot de passe.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      }); */


      // Use template literals to interpolate the value into the URL



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
