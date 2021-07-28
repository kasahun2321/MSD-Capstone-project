import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http: HttpClient) { }
  
  intializetoken() {
    return this.http.get(`http://localhost:3000/users/initializeBraintree`);
  }
  createbraintreenonce(data:any) {
    return this.http.post(`http://localhost:3000/users/confirmBraintree`, data)
  }
  payandfinish(data:any)
  {
    return  this.http.post(`http://localhost:3000/users/transferbalance`, data)
  }
  webhook(data:any)
  {
    return  this.http.post(`https://localhost:3000/users/webhookurl`, data)
  }
  printreciept()
  {
    return  this.http.get(`http://localhost:3000/users/receipt`)

  }
}
