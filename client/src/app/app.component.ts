import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from './service/http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  urlLogout: String;
  urlVerify: String;

  constructor(
    private httpRequestService: HttpRequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.urlLogout = '/logout';
    this.urlVerify = '/verify-user';

    this.httpRequestService.get(this.urlVerify)
      .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          document.getElementById("logout").style.display = "block";
        }
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }

  logout() {
    this.httpRequestService.get(this.urlLogout)
      .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          document.getElementById("logout").style.display = "none";
          this.router.navigate(['/']);
        }
      }, (error: any) => console.log('Ocorreu um erro: ' + error));
  }
}
