import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm!: FormGroup<any>;
  errorshow: boolean = true;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required]],
    });
  }
  userLogin() {
    this.errorshow = true;

    if (this.loginForm.valid) {
      let obj = {
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };

      this.http
        .post('http://localhost:8443/api/login/userLogin', obj)
        .subscribe((res: any) => {
          if (res) {
            sessionStorage.setItem('userName', res.userName);
            let al = sessionStorage.getItem('userName');
            sessionStorage.setItem('dataValue', '1');
          }
          console.log(res, 'kkk');

          this.router.navigate(['audios']);
        });
    } else {
      console.log('jkknk');
      this.errorshow = false;
    }
  }
}
