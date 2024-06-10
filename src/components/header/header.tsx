import Logo from "./components/logo";
import Favorites from "./components/favorites";
import "./header.css";

type Props = {
  favoritesCount: number;
};

const Header = ({ favoritesCount }: Props) => (
  <header className="marvelous-header">
    <Logo />
    <Favorites count={favoritesCount} />
  </header>
);

export default Header;
