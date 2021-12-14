import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServicesService } from './my-services.service';

@Component({
  selector: 'app-home',
  template: `
   <div class="container">
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" [routerLink]="['/','home']" routerLinkActive="active">HOME</a>
    <a class="navbar-brand" [routerLink]="['/', 'services']" routerLinkActive="active">Service Providers</a>
    <a class="navbar-brand" [routerLink]="['/', 'buyers']" routerLinkActive="active">Service Buyers</a>
    <a class="navbar-brand" [routerLink]="['/', 'signup']" routerLinkActive="active">Sign Up</a>
  </nav> -->
  <div class="container-fluid"> 
  <!-- <div class="d-grid gap-2">
    <button (click)='showSigninBuyer()' type="submit" class="btn btn-success">ServiceBuyer</button> 
    <button (click)='showSigninProvider()'type="submit" class="btn btn-primary">ServiceProvider</button>
    </div>
    <div *ngIf = "!displaySigninBuyer">
        <h3> Signin for Service Buyers</h3> -->

   <form [formGroup]="signinForm" (ngSubmit)="onSubmitLogin()">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input formControlName= 'email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input formControlName= 'password' type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-success">Submit</button>
</form>

<div *ngIf = "!displaySigninProvider">
        <h3> Signin for Service Provider</h3>
  <form (ngSubmit)="onSubmitLoginProviders()">
        <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input formControlName= 'email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input formControlName= 'password' type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</div>

  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder, private myService: MyServicesService, private router: Router) { }
  
  displaySigninBuyer = false
  displaySigninProvider = true
signinForm = this.fb.group({
    email:[''],
    password:['']
})

onSubmitLogin(){
this.myService.postSerBuyerLogin(this.signinForm.value).subscribe(
  (res: any)=> {
    localStorage.setItem('token', res.token)
    console.log(res) 
    // this.getLocation()
    this.router.navigate(['/buyers'])
  },
  err=>console.log(err)
)

this.signinForm.reset()

}

onSubmitLoginProviders(){

}

showSigninBuyer(){
  this.displaySigninBuyer = !this.displaySigninBuyer
  this.displaySigninProvider  = !this.displaySigninProvider 
  }
  showSigninProvider(){
    this.displaySigninProvider  = !this.displaySigninProvider 
    this.displaySigninBuyer = !this.displaySigninBuyer
  }
  
  getLocation(){
    this.myService.getPosition().then((res:any)=>{
        res.subscribe((data: any)=>{
          console.log(data.results[0].address_components[0].short_name, 
            data.results[0].address_components[1].short_name, data.results[0].address_components[2].short_name)
        })
    })
  }
  ngOnInit():any{
    
  }
  
}
