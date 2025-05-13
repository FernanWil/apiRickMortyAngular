import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute} from '@angular/router';
import { CharacterService } from '../service/character-service.service';
import { CommonModule } from '@angular/common';
import { apiResponse, characterModule } from '../module/characterModule';

@Component({
  selector: 'app-details-character',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './details-character.component.html',
  styleUrl: './details-character.component.css'
})
export class DetailsCharacterComponent {
  getId: number = 0;
  listCharacterById: characterModule[] = []
  constructor(private route: ActivatedRoute, private characterService: CharacterService){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')
    this.getId = Number(id);
    if (this.getId) {
      this.characterService.getCharacterById(this.getId).subscribe((elem: characterModule) =>{        
        if(elem){
          this.listCharacterById.push(elem)          
        }
      })
    }
  }
}
