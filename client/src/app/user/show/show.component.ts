import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'show-users',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  urlPath: String;
  users: Object;
  messageAlert: String;

  constructor(
    private httpRequestService: HttpRequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.urlPath = '/show-users';
    
    this.httpRequestService.get(this.urlPath)
      .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          this.users = response.data;
        } else if (response.logado === false) {
          this.router.navigate(['']);
        } else {
          this.messageAlert = response.msg;
        }
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }

}
