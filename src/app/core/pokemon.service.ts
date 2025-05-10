// src/app/core/pokemon.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  // Mappatura start/end ID per generazione
  private generationRanges: Record<number, { start: number; end: number }> = {
    1: { start: 1,   end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 898 },
    // aggiungi eventuali generazioni successive
  };

  constructor(private http: HttpClient) {}

  /** Restituisce i Pokémon di una specifica generazione */
  getPokemonByGeneration(gen: number): Observable<Pokemon[]> {
    const range = this.generationRanges[gen];
    if (!range) {
      throw new Error(`Generazione ${gen} non supportata`);
    }

    const requests: Observable<Pokemon>[] = [];
    for (let id = range.start; id <= range.end; id++) {
      requests.push(this.http.get<Pokemon>(`${this.apiUrl}/${id}`));
    }

    return forkJoin(requests);
  }
}
