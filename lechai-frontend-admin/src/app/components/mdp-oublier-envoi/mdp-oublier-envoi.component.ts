import { Component, Output, Input, EventEmitter} from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mdp-oublier-envoi',
  templateUrl: './mdp-oublier-envoi.component.html',
  styleUrls: ['./mdp-oublier-envoi.component.scss']
})
export class MdpOublierEnvoiComponent {
  @Output() hideForm = new EventEmitter<boolean>(); // Event emitter for removing the product
  @Input() showForm?:boolean;


  public resetPasswordEmail!:string;
  public isValidEmail=false;

constructor(private routingService:RoutingService, private toast:ToastService, private router: Router)
{

}
  toggleForm(){
    this.showForm=false

    setTimeout(() => {
      this.hideForm.emit(false);
    }, 500);
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }



  confirmToSend(){

    if(this.checkValidEmail(this.resetPasswordEmail))
    {
      this.routingService.oublieMDP(this.resetPasswordEmail).subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.toggleForm();
          this.routingService.oublieMDP(this.resetPasswordEmail)
          this.router.navigate([`/mdpOublierChangement`]);
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'il n\'existe pas de compte avec ce courriel et ce mot de passe.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      });
    }

  }
}
