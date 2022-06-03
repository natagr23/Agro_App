import React, { useContext } from 'react';
import Header from './Header';
// import SideNav from './SideNav';
import classes from './Wrapper.module.css';
// import { useGlobalContext } from '../../Context/context';
import { ShopContext } from '../../Context/ShopContext';
import MobileNav from './MobileNav';
import ButtonNav from './ButtonNav';
// import { useRouter } from 'next/router';
const Wrapper = ({ children }) => {
  const ctx = useContext(ShopContext);
  // const router = useRouter();
  // const { isToggled, darkMode } = useGlobalContext();
  return (
    <div className={classes.container}>
      {/* <SideNav /> */}
      <MobileNav />
      <main
        style={
          {
            // overflowX: router.pathname === '/dashboard' && 'hidden'
          }
        }
        className={`${classes.main} ${
          ctx.isToggled ? classes.shrinkMain : classes.showMain
        } ${ctx.darkMode ? classes.dark : classes.light}`}
      >
        {/* <Header /> */}
        {children}
        <div className={classes.mobileButtomNav}> {/* <ButtonNav /> */}</div>
      </main>
    </div>
  );
};

export default Wrapper;
