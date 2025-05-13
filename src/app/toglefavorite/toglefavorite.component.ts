import { Component, Input } from '@angular/core';
import { LocalstorageService } from '../service/localstorage.service';
import { characterModule } from '../module/characterModule';
import { NotificationService } from '../service/notification.service';

@Component({
	selector: 'app-toglefavorite',
	imports: [],
	templateUrl: './toglefavorite.component.html',
	styleUrl: './toglefavorite.component.css'
})
export class ToglefavoriteComponent {
	@Input() character!: characterModule;

	constructor(private localStorageService: LocalstorageService, private notificationService: NotificationService){}
	getIconToggle() {
		return this.character.isFavorite ? 'mdi--heart.png' : 'mdi--heart-outline.png';
	}

	toggleFav() {
		const isFavorite = this.character.isFavorite;
		this.getIconToggle();
		this.character.isFavorite = !isFavorite;
		this.addOrRemoveCharacterFav(this.character);
		this.notificationAboutCharacter(this.character.isFavorite)
	}

	addOrRemoveCharacterFav(character: characterModule){
		const {id} = character
		const getCharacterFav = this.localStorageService.getcharactersFavorite()		
		const found = !!getCharacterFav.find((item: characterModule) => item.id == id)
		found ? this.localStorageService.removeCharacterFavorite(id) : this.localStorageService.addCharacterFavorite(this.character)
	}

	notificationAboutCharacter(isFavorite: boolean){
		if (!isFavorite) this.notificationService.notifications('Se ha quitado de favoritos');
		else this.notificationService.notifications('Se ha agregado a favoritos')
	}

}
