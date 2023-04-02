import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/layouts/Layout';
import { NoFavorites } from '@/components/ui/';
import { localFavorites } from '@/utils';
import { FavoritePokemons } from '@/components/pokemon';

const FavoritesPage: NextPageWithLayout = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(localFavorites.pokemons);
  }, []);

  return (
    <>
      {favorites.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons favorites={favorites} />
      )}
    </>
  );
};

FavoritesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default FavoritesPage;
