import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUsersUrl = "api/users";
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUsersUrl);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.apiUsersUrl + "/" + id);
  }

  update(User: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content type": "application/json" }),
    };
    return this.http.put(this.apiUsersUrl, User, httpOptions);
  }

  add(User: User): Observable<any> {
    console.log(this.http.post<User>(this.apiUsersUrl, User));
    return this.http.post<any>(this.apiUsersUrl, User);
  }

  delete(User: User): Observable<User> {
    console.log(this.http.delete<User>(this.apiUsersUrl + "/" + User.id));
    return this.http.delete<User>(this.apiUsersUrl + "/" + User.id);
  }
}
