import { Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { DetailsCharacterComponent } from './details-character/details-character.component';
import { FavoriteCharactersComponent } from './favorite-characters/favorite-characters.component';

export const routes: Routes = [
    {path: '', component: CharacterComponent},
    {path: 'details/:id', component: DetailsCharacterComponent},
    {path: 'favorite', component: FavoriteCharactersComponent},
    {path: '**', redirectTo: ''}
];
