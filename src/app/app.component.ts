import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterComponent } from "./character/character.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api-rick-and-morty';
}
