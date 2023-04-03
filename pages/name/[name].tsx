import { pokeApi } from '@/api';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement, useState } from 'react';
import { getPokemon, localFavorites } from '@/utils';
import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/layouts/Layout';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPageWithLayout<Props> = ({ pokemon }) => {
  console.log(pokemon);

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
  const { data: pokemons } = await pokeApi.get<PokemonListResponse>(
    '/pokemon?limit=151'
  );

  return {
    paths: pokemons.results.map((pokemon) => ({
      params: { name: pokemon.name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: { pokemon: await getPokemon(name) },
  };
};

PokemonByNamePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default PokemonByNamePage;
