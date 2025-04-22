import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() nameCharacterSearch =  new EventEmitter<string>();

  getNameCharacterSearch(value: any){
    const search: string = value.target.value;
    this.nameCharacterSearch.emit(search);
	}
}
