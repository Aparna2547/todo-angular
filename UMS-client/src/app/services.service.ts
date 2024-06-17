import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  backendURL = 'http://localhost:3000/api/user'

  constructor(private http:HttpClient) { }

  signup(name:String,phone:string,password:String){
    return this.http.post(`${this.backendURL}/signup`,{name,phone,password})
  }
  login(phone:String,password:String){
    return this.http.post(`${this.backendURL}/login`,{phone,password})
  }
  addNote(content:String){
    return this.http.post(`${this.backendURL}/addNote`,{content})
  }
  
  getEditNote(id: string): Observable<any> {
    console.log('Sending request for ID:', id);
    return this.http.get(`${this.backendURL}/data?id=${id}`);
  }


  editNote(id:String,content:String){
    return this.http.put(`${this.backendURL}/editNote?id=${id}`,{content})
  }


  deleteNote(id:string){
    return this.http.delete(`${this.backendURL}/deleteNote/${id}`)
  }


  allNotes(){
    return this.http.get(`${this.backendURL}/allnotes`)
  }
}
