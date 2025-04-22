import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CharacterService {

	private urlSingle: string = 'https://rickandmortyapi.com/api/';

	constructor(private http: HttpClient) { }

	getData(apiUrl: string = `${this.urlSingle}character/`): Observable<any> { 
		return this.http.get<any>(apiUrl).pipe(share()); }
	// getDataSearch(id: number): Observable<any>{
	// 	return this.http.get<any>(`${this.urlSingle}character/?page=${id}`).pipe(share())
	// }

	// getCharacterById(apiUrl: string = `${this.urlSingle}character/`, id: number):Observable<any>{
	// 	return this.http.get<any>(apiUrl + id).pipe(share())
	// }

	getCharacterById(id: number): Observable<any>{
		return this.http.get<any>(`${this.urlSingle}character/${id}`).pipe(share())
	}
	
	
}
