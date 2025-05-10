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

  onGenerationChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const gen = Number(select.value);
    if (gen !== this.selectedGeneration) {
      this.selectedGeneration = gen;
      this.loadPokemonByGeneration(gen);
    }
  }

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
