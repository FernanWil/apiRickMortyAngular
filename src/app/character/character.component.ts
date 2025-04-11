import { Component } from '@angular/core';
import { characterModule } from '../module/characterModule';
import { CharacterService } from '../service/character-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InfiniteScrollDirective} from 'ngx-infinite-scroll';

@Component({
	selector: 'app-character',
	imports: [FormsModule, CommonModule, RouterModule, InfiniteScrollDirective],
	templateUrl: './character.component.html',
	styleUrl: './character.component.css'
})
export class CharacterComponent {
	characterList: Array<any> = [];
	characterListCopy:  Array<any> = [];
	nextUrl: string = "	";

	constructor(private characterSerice: CharacterService, private router: Router ) {}
	ngOnInit(){ this.getAllCharacters() }
	
	getAllCharacters() {
		this.characterSerice.getData().subscribe((res: any) => {
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
		})		
	}

	searchCharacter(event: any){
		const search: string = event.target.value;
		this.characterList =  this.characterListCopy?.filter(({name}:characterModule) =>{
			return name.toLowerCase().includes(search.toLowerCase())
		})
	}

	details(id: number){ console.log({id}) }

	onScroll(){
		this.characterSerice.getData(this.nextUrl).subscribe({
			next: (response) => {
				if (response.info.next && response.info.next != null) {
					this.nextUrl = response.info.next
					Array.from(response.results).forEach((elem) =>{
						this.characterList = [...this.characterList, elem]
					})
					
				}
			}
		})
	}
}
