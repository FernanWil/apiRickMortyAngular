import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, share } from 'rxjs';
import { apiResponse, characterModule } from '../module/characterModule';

@Injectable({
	providedIn: 'root'
})
export class CharacterService {

	private urlSingle: string = 'https://rickandmortyapi.com/api/';

	constructor(private http: HttpClient) { }

	getData(apiUrl: string = `${this.urlSingle}character/`): Observable<apiResponse> { 
		return this.http.get<apiResponse>(apiUrl).pipe(share()); 
	}

	getCharacterById(id: number): Observable<characterModule>{
		return this.http.get<characterModule>(`${this.urlSingle}character/${id}`).pipe(share())
	}
	
	
}
