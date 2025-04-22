import { Component } from '@angular/core';
import { characterModule } from '../module/characterModule';
import { CharacterService } from '../service/character-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
	selector: 'app-character',
	imports: [FormsModule, CommonModule, RouterModule, InfiniteScrollDirective, NavbarComponent],
	templateUrl: './character.component.html',
	styleUrl: './character.component.css'
})
export class CharacterComponent {

	characterList: characterModule[] = [];
	characterListCopy: characterModule[] = [];
	nextUrl: string = '';
	search: string = '';
	infinityScrollDisabled = false;
	list: characterModule[] = [];

	constructor(private characterSerice: CharacterService, private router: Router) { }
	ngOnInit() {
		this.getAllCharacters();
	}

	getAllCharacters() {
		this.characterSerice.getData().subscribe((res: any) => {
			// console.log(res.results[0].url);
			this.characterList = res.results.map(({ id, name, status, image, species, gender }: characterModule) => {
				return {
					id: id,
					name: name,
					status: status,
					image: image,
					species: species,
					gender: gender,
				};
			});
			this.characterListCopy = this.characterList;
			this.nextUrl = res.info.next;			
			// this.getAllCharacter();
			// console.log(this.nextUrl);

		})
	}

	searchCharacter(nameSearch: string) {
		if (this.search.length != 0) this.infinityScrollDisabled = true 
		this.search = nameSearch;
		this.characterList = this.characterListCopy.filter(({ name }: characterModule) => {			
			return name.toLowerCase().includes(this.search.toLowerCase())
		})
		this.infinityScrollDisabled = false
	}


	onScroll() {
		this.characterSerice.getData(this.nextUrl).subscribe({
			next: (response) => {
				if (response.info.next && response.info.next != null) {
					this.nextUrl = response.info.next					
					response.results.forEach((elem: characterModule) => {
						this.characterList = [...this.characterList, elem]
						this.characterListCopy = [...this.characterList, elem]
					})

				}
			}
		})
	}

	details(id: number) { this.router.navigate([`/details/${id}`])}

}
