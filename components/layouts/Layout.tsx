import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Navbar } from '../ui';

interface Props {
  children: ReactNode;
  title?: string;
}

const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Steven Elias @steevened" />
        <meta name="description" content={`${title}`} />
        <meta name="keywords" content={`pokemons ${title}`} />
      </Head>

      {/* navbar */}
      <Navbar />

      <main
        style={{
          padding: '0 20px',
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
