import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import ValidationInput from 'src/app/helpers/validationInput';
import { ToastService } from 'src/app/services/toast.service';
import { RoutingService } from 'src/app/services/routing.service';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mdp-oublier-changement',
  templateUrl: './mdp-oublier-changement.component.html',
  styleUrls: ['./mdp-oublier-changement.component.scss']
})
export class MdpOublierChangementComponent {

  passType: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  passTypeV: string = "password";
  isTextV: boolean = false;
  eyeIconV: string = "fa-eye-slash";

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private toast: ToastService, private router: Router, private routingService:RoutingService, private footerPosition:FooterPositionService){

  }

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      token: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d<>@!#$%^&*()_+\[\]{}?:;|',./~.`\-=/]{8,}$/)]],
      validation: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator // Fonction de validation personnalisée
    });
    this.routingService.callRefresh();
    this.footerPosition.setIsAbsolute(false)
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')!.value;
    const validation = group.get('validation')!.value;

    // Comparez les valeurs des champs "password" et "validation"
    if (password === validation) {
      return null; // Correspondance, pas d'erreur de validation
    } else {
      return { mismatch: true }; // Pas de correspondance, retourne une erreur de validation
    }
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.passType = "text" : this.passType = "password";
  }

  hideShowPassV(){
    this.isTextV = !this.isTextV;
    this.isTextV ? this.eyeIconV = "fa-eye" : this.eyeIconV = "fa-eye-slash";
    this.isTextV ? this.passTypeV = "text" : this.passTypeV = "password";
  }

  onSignup(){
    if(this.signupForm.valid)
    {

      // envoyer à la base de données

      this.routingService.postChangementMDP(this.signupForm.get("password")!.value, this.signupForm.get("token")!.value).subscribe({
        next:(data:any)=>{
          this.toast.showToast("success", "Le changement de mot de passe a fonctionné!", "bottom-center", 1000);
          this.router.navigate(['connexion'] );
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Veuillez réessayer plus tard.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      })


      /* this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.showToast("success", res.message, "bottom-center", 1000);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          this.toast.showToast("error", err?.error.message, "top-center", 5000);
        }
      }) */
    }
    else{
      ValidationInput.validationInput(this.signupForm);
      this.toast.showToast("error", "Assurez-vous d'avoir bien retranscrit le token et que le nouveau mot de passe est conforme aux règles.", "bottom-center", 4000);
    }
  }



}
