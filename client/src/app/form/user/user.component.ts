import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import { ValidatorFormService } from '../../service/validator-form.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  messageErrorsServer: Array<String>;
  messageSuccess: String;

  constructor(
    private httpRequestService: HttpRequestService,
    private validatorFormService: ValidatorFormService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.urlPath = '/save';
    this.urlDatasUser = '/lista-usuarios/server/';
    this.typesUser = [
      { 'name': 'Comum', 'value': 0, 'selected': true },
      { 'name': 'Administrador', 'value': 1, 'selected': false }
    ]
    this.fieldsValidator = { 'email': true, 'password': true, 'type': true };

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    if (this.id) {
      this.getDatasUser(this.id);
    }

    this.form = this.validatorFormService.validate(this.fieldsValidator);
    this.validatorMessage = this.validatorFormService.messages;
  }

  submit(form: HTMLFormElement) {
    this.httpRequestService.post(this.urlPath, form.value)
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.messageSuccess = data.msg;
          this.form = this.validatorFormService.validate(this.fieldsValidator);
        } else {
          this.messageErrorsServer = data.msg;
        }
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }

  private getDatasUser(id: HTMLInputElement) {
    this.httpRequestService.post(this.urlDatasUser, id)
      .map(res => res.json())
      .subscribe(data => {
        this.form = this.validatorFormService.validate(this.fieldsValidator, data);
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }

}