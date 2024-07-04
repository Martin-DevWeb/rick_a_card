import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-page-cards',
  templateUrl: './page-cards.component.html',
  styleUrls: ['./page-cards.component.css'],
})
export class PageCardsComponent implements OnInit {
  values?: Character[] = [];

  constructor(private localServ: LocalstorageService) {}

  ngOnInit(): void {
    this.values = this.allStorage();
  }

  allStorage() {
    var archive: Character[] = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

    for (; (key = keys[i]); i++) {
      if (key != 'hour') {
        let char = JSON.stringify(this.localServ.getItem(key));
        archive.push(JSON.parse(char));
      }
    }

    return archive;
  }
}
