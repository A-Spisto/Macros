import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // <-- necessario
import { PokemonService, Pokemon } from 'src/app/core/pokemon.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],  // <-- importa CommonModule qui
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  selectedGeneration = 1;
  isLoading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonByGeneration(this.selectedGeneration);
  }

  onGenerationChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.loadPokemonByGeneration(Number(value));
  }

  generations = [
    { value: 1, label: 'Generazione 1' },
    { value: 2, label: 'Generazione 2' },
    { value: 3, label: 'Generazione 3' },
    { value: 4, label: 'Generazione 4' },
    { value: 5, label: 'Generazione 5' },
    { value: 6, label: 'Generazione 6' },
    { value: 7, label: 'Generazione 7' },
    { value: 8, label: 'Generazione 8' },
    { value: 9, label: 'Generazione 9' }
  ];

  loadPokemonByGeneration(gen: number): void {
    this.isLoading = true;
    this.pokemonService.getPokemonByGeneration(gen).subscribe({
      next: data => {
        this.pokemonList = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
