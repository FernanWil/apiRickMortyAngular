import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { LocalstorageService } from '../service/localstorage.service';
import { CommonModule } from '@angular/common';
import { ToglefavoriteComponent } from "../toglefavorite/toglefavorite.component";

@Component({
    selector: 'app-favorite-characters',
    imports: [NavbarComponent, CommonModule, ToglefavoriteComponent],
    templateUrl: './favorite-characters.component.html',
    styleUrl: './favorite-characters.component.css'
})
export class FavoriteCharactersComponent {
    charactersFav$: any ;

    constructor(private localStorageService: LocalstorageService) {
        this.localStorageService.charactersFavorite$.subscribe(i => {
            this.charactersFav$ = i
        });
    }

}
