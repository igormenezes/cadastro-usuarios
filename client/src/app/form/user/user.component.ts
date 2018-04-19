import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import { ValidatorFormService } from '../../service/validator-form.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  urlPath: String;
  urlDatasUser: String;
  fieldsValidator: Object;
  typesUser: Array<Object>;
  id: HTMLInputElement;
  form: any;
  validatorMessage: Object;
  errorsValidationServer: Array<String>;
  messageSuccess: String;
  messageAlert: String;

  constructor(
    private httpRequestService: HttpRequestService,
    private validatorFormService: ValidatorFormService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.urlPath = '/save';
    this.urlDatasUser = '/show-user';
    this.typesUser = [
      { 'name': 'Comum', 'value': 0, 'selected': true },
      { 'name': 'Administrador', 'value': 1, 'selected': false }
    ]


    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    if (this.id) {
      this.fieldsValidator = { 'email': true, 'password': false, 'type': true };
      this.urlPath = '/update-user/' + this.id;
      this.getDatasUser(this.id);
    } else {
      this.fieldsValidator = { 'email': true, 'password': true, 'type': true };
    }

    this.form = this.validatorFormService.validate(this.fieldsValidator);
    this.validatorMessage = this.validatorFormService.messages;
  }

  submit(form: HTMLFormElement) {
    this.messageSuccess = null;
    this.errorsValidationServer = null;

    this.httpRequestService.post(this.urlPath, form.value)
      .map(res => res.json())
      .subscribe(response => {
        if (response.success && this.id) {
          this.router.navigate(['/show-users']);
        } else if (response.success) {
          this.messageSuccess = response.msg;
          this.form = this.validatorFormService.validate(this.fieldsValidator);
        } else {
          this.errorsValidationServer = response.msg;
        }
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }

  private getDatasUser(id: any) {
    this.httpRequestService.get(this.urlDatasUser + '/' + id)
      .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          this.form = this.validatorFormService.validate(this.fieldsValidator, response.data);
        } else {
          this.router.navigate(['']);
        }
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }
}