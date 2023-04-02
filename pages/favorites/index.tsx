import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/layouts/Layout';

const FavoritesPage: NextPageWithLayout = () => {
  return <h1>Favorites </h1>;
};

FavoritesPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default FavoritesPage;
