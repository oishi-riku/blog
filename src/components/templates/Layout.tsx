import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <header>test</header>
      <main>{children}</main>
      <footer>test</footer>
    </>
  );
};

export default Layout;
