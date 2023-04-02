import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import { FC, ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layouts/Layout';
import { GetStaticProps } from 'next';
import { pokeApi } from '@/api';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { PokemonCard } from '@/components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPageWithLayout<Props> = ({ pokemons }) => {
  // console.log(pokemons);

  return (
    <>
      <Grid.Container
        gap={2}
        justify="flex-start"
        // css={{ border: '1px solid blue' }}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data: pokemons } = await pokeApi.get<PokemonListResponse>(
    '/pokemon?limit=151'
  );

  pokemons.results.forEach((pokemon) => {
    const id = pokemon.url.split('/')[6];
    pokemon.id = Number(id);
    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  });

  // console.log(pokemons);

  return {
    props: {
      pokemons: pokemons.results,
    },
  };
};

HomePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
