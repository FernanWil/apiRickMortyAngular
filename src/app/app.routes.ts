import { Routes } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { DetailsCharacterComponent } from './details-character/details-character.component';

export const routes: Routes = [
    {path: '', component: CharacterComponent},
    {path: 'details/:id', component: DetailsCharacterComponent},
    {path: '**', redirectTo: ''}
];
