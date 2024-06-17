import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seach',
  templateUrl: './seach.component.html',
  styleUrl: './seach.component.css'
})
export class SeachComponent {

  searchValue:string ='';

  @Output()
  searchTextChanged:EventEmitter<string> = new EventEmitter<string>();
  
  onSearchtextChanged (){
    this.searchTextChanged.emit(this.searchValue);
    
  }
}
