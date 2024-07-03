import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private baseURL = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get(this.baseURL);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseURL}/${id}`);
  }
}
