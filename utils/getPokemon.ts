import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';

export const getPokemon = async (nameOrId: string) => {
  // const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
};
