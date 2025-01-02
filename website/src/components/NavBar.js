import { Link } from "react-router-dom";
import SettingsWheel from "./SettingsWheel";
import BubbleEffect from "../effects/Bubble"; 
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>Francois Website</Link>
      <div className={styles.links}>
        <Link to="/about" className={styles.link}>About Me</Link>
        <Link to="/projects" className={styles.link}>Projects</Link>
      </div>
      <SettingsWheel />
      <BubbleEffect /> 
    </nav>
  );
};

export default NavBar;