import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() nameCharacterSearch =  new EventEmitter<string>();

  form: FormGroup;
  constructor(){
    this.form = new FormGroup({
      search: new FormControl(''),
    })
  }

  ngOnInit(){    
    this.form.get('search')?.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      this.nameCharacterSearch.emit(res);
      // const search: string = value.target.value;
    })
	}
}
