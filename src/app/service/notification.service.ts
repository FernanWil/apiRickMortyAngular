import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	private notificationCharacterFav = new Subject;
	notificationCharacterFav$ = this.notificationCharacterFav.asObservable();

	constructor() { }

	notifications(message: string , time: number = 3000) {
		this.notificationCharacterFav.next({message, time});
	}
}
