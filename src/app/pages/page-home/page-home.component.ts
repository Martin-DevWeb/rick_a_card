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
  alreadyHaveIt: boolean = false;
  nextClick!: string | null;

  constructor(
    private cardsService: CardsService,
    private localServ: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.cardsService.getCharacters().subscribe((data: any) => {
      return (this.count = data.info.count);
    });

    this.checkTime();
  }

  pickACard() {
    this.isLoading = true;
    this.cardsService.getCharacter(this.randomValue()).subscribe({
      next: (res) => {
        this.drawnCard = res;
        this.isLoading = false;
        if (this.localServ.getItem(res.id.toString())) {
          this.alreadyHaveIt = true;
        }
      },
      error: () => {},
    });
  }

  randomValue(): number {
    return Math.floor(Math.random() * this.count) + 1;
  }

  localStorage(key: number, value: Character) {
    if (!this.alreadyHaveIt) {
      this.localServ.setItem(key.toString(), value);
    }
  }

  reloadPage() {
    window.location.reload();
  }

  storeTime() {
    let currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 2);
    this.localServ.setItem('hour', currentTime);
  }

  checkTime() {
    let currentTime = new Date().toString();

    let time;

    if (this.localServ.getItem('hour') != null) {
      let updateTimeText = this.localServ.getItem('hour');
      time = updateTimeText;
    }

    if (Date.parse(currentTime) >= Date.parse(time!)) {
      document.querySelector('#clik')?.removeAttribute('disabled');
      this.localServ.removeItem('hour');
    }

    if (this.localServ.getItem('hour') === null) {
      document.querySelector('#click')?.removeAttribute('disabled');
    } else {
      this.nextClick = this.localServ.getItem('hour');
    }
  }
}
