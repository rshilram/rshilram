import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactserService {
 private apiurl='https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile';

  constructor(private http:HttpClient) { }

  getcontacts():Observable<any>{
    return this.http.get<any>(this.apiurl)
  }
  getcontent(id:string): Observable<any>{
    return this.http.get<any>(`${this.apiurl}/${id}`)
  }

  deletecontant(id:string):Observable<any>{
    return this.http.delete<any>(`${this.apiurl}/${id}`)
  }
  createcontact(contact:any):Observable<any>{
    return this.http.post<any>(this.apiurl,contact)
  }
  updatecontact(id:string,contact:any):Observable<any>{
    return this.http.put<any>(`${this.apiurl}/${id}`, contact)
  }

}
