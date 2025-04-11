import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
// import { characterModule } from '../module/characterModule';

@Injectable({
	providedIn: 'root'
})
export class CharacterService {

	private urlSingle: string = 'https://rickandmortyapi.com/api/';

	constructor(private http: HttpClient) { }

	getData(apiUrl: string = `${this.urlSingle}character/`): Observable<any> { 
		return this.http.get<any>(apiUrl).pipe(share()); }

	// loadingMoreCharacters(id: number): Observable<any>{
	// 	console.log(id);
	// 	return this.http.get<any>(`${this.url}/?page=${id}`)
	// }

	
}
