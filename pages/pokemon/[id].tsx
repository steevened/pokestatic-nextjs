import { ReactElement, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/layouts/Layout';
import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokemon, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPageWithLayout<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.isOnFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 200,
      angle: -100,
      origin: { x: 0.9, y: 0.2 },
    });
  };

  return (
    <Grid.Container css={{ marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{ padding: '30px' }}>
          <Card.Body>
            <Card.Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                './no-image.png'
              }
              alt={pokemon.name}
              width={'100%'}
              height={'200px'}
            />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text transform="capitalize" h1>
              {pokemon.name}
            </Text>
            <Button
              onClick={onToggleFavorite}
              color={'gradient'}
              ghost={!isInFavorites}
            >
              {isInFavorites ? 'In Favorites' : 'Save to Favorites'}
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites: </Text>
            <Container display="flex" gap={0}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPokemons = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: allPokemons.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemon(id),
    },
  };
};

PokemonPage.getLayout = (page: ReactElement) => {
  const name = page.props.pokemon.name;
  return <Layout title={'Pokemon App - ' + name}>{page}</Layout>;
};

export default PokemonPage;
