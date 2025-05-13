import { Component } from '@angular/core';
import { apiResponse, characterModule } from '../module/characterModule';
import { CharacterService } from '../service/character-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NavbarComponent } from "../navbar/navbar.component";
import { LocalstorageService } from '../service/localstorage.service';
import { ToglefavoriteComponent } from "../toglefavorite/toglefavorite.component";

@Component({
	selector: 'app-character',
	imports: [FormsModule, CommonModule, RouterModule, InfiniteScrollDirective, NavbarComponent, ToglefavoriteComponent],
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

	constructor(private characterSerice: CharacterService, private router: Router, private localStorageService: LocalstorageService) { }
	ngOnInit() { this.getAllCharacters(); }

	getAllCharacters() {
		this.characterSerice.getData().subscribe((res: apiResponse) => {			
			this.parseCharacterData(res.results);
			this.characterListCopy = this.characterList;
			this.nextUrl = res.info.next;						
		})
	}

	private parseCharacterData(character: characterModule[]){
		const characterFav = this.localStorageService.getcharactersFavorite();
		const characterNewData = character.map((cha: characterModule) => {
			const found = !!characterFav.find((item: characterModule) => item.id == cha.id);
			return {...cha, isFavorite: found}
		})
		this.characterList = characterNewData		
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
