import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CardsService } from 'src/app/services/cards.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
})
export class PageHomeComponent implements OnInit {
  isLoading = false;
  count!: number;
  drawnCard?: Character;
  Json: any;

  constructor(
    private cardsService: CardsService,
    private localServ: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.cardsService.getCharacters().subscribe((data: any) => {
      return (this.count = data.info.count);
    });
  }

  pickACard() {
    this.isLoading = true;
    this.cardsService.getCharacter(this.randomValue()).subscribe({
      next: (res) => {
        console.log(res);
        this.drawnCard = res;
        this.isLoading = false;
      },
      error: () => {},
    });
  }

  randomValue(): number {
    return Math.floor(Math.random() * this.count) + 1;
  }

  localStorage(key: number, value: Character) {
    if (this.localServ.getItem(key.toString()) !== null) {
      this.localServ.setItem(key.toString(), value);
    }
  }
}
