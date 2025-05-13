import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { characterModule } from '../module/characterModule';

const myCharactersFavorite: string = 'myFavorites';
@Injectable({
	providedIn: 'root'
})
export class LocalstorageService {
	private charactersFavorite = new BehaviorSubject<characterModule[]>([]);
	charactersFavorite$ = this.charactersFavorite.asObservable();

	constructor() { this.initialLocalStorage() }	

	addCharacterFavorite(character: characterModule){
		try {
			const gotCharacter = this.getcharactersFavorite();
			localStorage.setItem(myCharactersFavorite, JSON.stringify([...gotCharacter, character]));
			this.charactersFavorite.next([...gotCharacter, character]);
		} catch (error) {
			console.log(`Error al agregar un personaje a favoritos ${error}`);
		}
	}
	removeCharacterFavorite(id: number): void{
		try {
			const gotCharacter = this.getcharactersFavorite();
			const filterCharacter = gotCharacter.filter((i: { id: number; }) => i.id != id);
			localStorage.setItem(myCharactersFavorite, JSON.stringify([...filterCharacter]))
			this.charactersFavorite.next([...filterCharacter])
			
		} catch (error) {
			console.log(`Error al remover un personaje de  favoritos ${error}`);
		}
	}

	getcharactersFavorite() {
		try {
			const getCharacter = JSON.parse(localStorage.getItem(myCharactersFavorite) ?? 'null');
			this.charactersFavorite.next(getCharacter);
			return getCharacter
		} catch (error) {
			console.log('Error al obtener los personajes del localStorage', error);
		}
	}

	private initialLocalStorage(): void {
		const initial = JSON.parse(localStorage.getItem(myCharactersFavorite) ?? 'null');
		if (!initial) localStorage.setItem(myCharactersFavorite, JSON.stringify([]));

		this.getcharactersFavorite();
	}
}
