import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/model/authenticationResponse';
import { LoginData } from 'src/app/model/developer/loginData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginData : LoginData = new LoginData();
  public errorMessage: String;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginData.email + "emailAddress");
    console.log("hellooooooooo");
    this.authService.login(this.loginData).subscribe({
      next: (response: AuthenticationResponse) => { 
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorMessage="An error occured";

        if (errorResponse.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${errorResponse.error.message}`;
        } else {
          // If the backend returned an unsuccessful response
          this.errorMessage = `Error Code: ${errorResponse.status} \n Message: ` + errorResponse.error;
        }
      }
    });
  }
}