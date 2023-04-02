import { Card, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
interface Props {
  id: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ id }) => {
  const router = useRouter();

  const onClickPokemon = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Grid onClick={onClickPokemon} xs={6} sm={3} md={2} xl={1} key={id}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        />
      </Card>
    </Grid>
  );
};
