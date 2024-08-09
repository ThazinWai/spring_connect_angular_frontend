import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, 
    private localStorageService: LocalStorageService) {}

  signup(signupRequestPayload:SignupRequestPayload):Observable<any>{
    return this.httpClient.post(
      'http://localhost:8080/api/auth/signup',
      signupRequestPayload,
      {responseType: 'text'}
    )
  }

  login(loginRequestPayload:LoginRequestPayload):Observable<boolean>{
    return this.httpClient.post<LoginResponsePayload>(
      'http://localhost:8080/api/auth/login', loginRequestPayload
    ).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);

      return true;
    }));
  }
}
