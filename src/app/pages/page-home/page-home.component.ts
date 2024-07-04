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
        console.log(res);
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
    console.log(this.localServ.getItem(key.toString()));
    if (!this.alreadyHaveIt) {
      this.localServ.setItem(key.toString(), value);
    }
  }

  reloadPage() {
    window.location.reload();
  }

  storeTime() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let currentTime = hours + 2 + ':' + minutes + ':' + seconds;
    this.localServ.setItem('hour', currentTime);
  }

  checkTime() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let currentTime = [hours, minutes, seconds];

    let updateTime = this.localServ.getItem('hour')?.split(':');

    if (this.localServ.getItem('hour') == null) {
      document.querySelector('#click')?.removeAttribute('disabled');
    } else {
      this.nextClick = this.localServ.getItem('hour');
    }

    if (currentTime[0] >= Number(updateTime![0])) {
      if (currentTime[1] >= Number(updateTime![1])) {
        if (currentTime[2] >= Number(updateTime![2])) {
          document.querySelector('#clik')?.removeAttribute('disabled');
          this.localServ.removeItem('hour');
        }
      }
    }
  }
}
