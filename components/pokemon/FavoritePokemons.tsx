import { Grid } from '@nextui-org/react';
import { FavoriteCardPokemon } from './FavoriteCardPokemon';
import { FC } from 'react';

interface Props {
  favorites: number[];
}

export const FavoritePokemons: FC<Props> = ({ favorites }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favorites.map((id) => (
        <FavoriteCardPokemon key={id} id={id} />
      ))}
    </Grid.Container>
  );
};
