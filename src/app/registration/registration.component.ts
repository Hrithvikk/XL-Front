import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  public registrationForm!: FormGroup<any>;
  errorshow: boolean = true;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  addRegister() {
    this.errorshow = true;
    if (this.registrationForm.valid) {
      alert('1');
      // if (this.registrationForm.invalid) {
      //   this.markFormGroupTouched(this.registrationForm);
      //   return;
      // }
      // if (this.registrationForm.valid) {
      let obj = {
        userName: this.registrationForm.value.userName,
        mobile: this.registrationForm.value.mobile,
        password: this.registrationForm.value.password,
      };
      console.log(obj, 'ooo');

      this.http
        .post('http://localhost:8443/api/register/createUser', obj)
        .subscribe((res: any) => {
          alert('2');

          console.log('result', res);
        });
    } else {
      this.errorshow = false;
    }
  }
  markFormGroupTouched(registrationForm: FormGroup<any>) {
    throw new Error('Method not implemented.');
  }
}
