import { Component, OnInit, Input } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import { ValidatorFormService } from '../../service/validator-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'form-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  urlPath: String;
  fieldsValidator: Object;
  form: any;
  validatorMessage: Object;
  messageAlert: String;

  constructor(
    private httpRequestService: HttpRequestService,
    private validatorFormService: ValidatorFormService,
    private router: Router
  ) { }

  ngOnInit() {
    this.urlPath = '/login';
    this.fieldsValidator = { 'email': true, 'password': true };

    this.form = this.validatorFormService.validate(this.fieldsValidator);
    this.validatorMessage = this.validatorFormService.messages;
  }

  submit(form: HTMLFormElement) {
    this.httpRequestService.post(this.urlPath, form.value)
      .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          this.router.navigate(['/show-users']);
        } else {
          this.messageAlert = response.msg;
        }
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }

}