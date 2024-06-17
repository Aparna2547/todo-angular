import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UMS';
  isLoading: boolean = false

  constructor(private router:Router){
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationStart){
        this.isLoading = true
      }else if(event instanceof NavigationStart){
          this.isLoading = false
      }
    })
  }
}
