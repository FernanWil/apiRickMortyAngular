import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterComponent } from "./character/character.component";
import { LocalstorageService } from './service/localstorage.service';
import { NotificationService } from './service/notification.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'api-rick-and-morty';
	messageAlert: string = ''
	timeout:  number = 0;
	showAlert: boolean = false;
	constructor(private notificationService: NotificationService) { }

	ngOnInit(){
		this.notificationService.notificationCharacterFav$.subscribe((res: any) => {			
			this.messageAlert = res.message
			this.showAlert = true;
			setTimeout(() => {
				this.showAlert = false
			}, res.time);
			
		})
	}


}
