import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// import { useGlobalContext } from '../../Context/context';
import classes from './MobileNav.module.css';
// import { navLinks } from './SideNav';
// import { useRouter } from 'next/router';
import { MdClose, MdOutlinePostAdd } from 'react-icons/md';
import { Box } from '@mui/system';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useAuthDispatch } from '../../Context/AuthContext_reducer';
import { ShopContext } from '../../Context/ShopContext';

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: 1,
    },
  },
};

// const links = navLinks.map((l) => l);
// links.splice(3, 0, );
// links[3] = {
//   icon: MdOutlinePostAdd,
//   text: 'Create Party',
//   link: '/parties/new',
// };

const MobileNav = () => {
  // const router = useRouter();
  const ctx = useContext(ShopContext);
  const dispatch = useAuthDispatch();
  // const { isToggleMobile, toggleMobile, toggleTheme, darkMode } =
  //   useGlobalContext();
  return (
    <main>
      <AnimatePresence>
        {ctx.isToggleMobile && (
          <motion.div className={classes.backgroundCont}>
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: '300px',
              }}
              exit={{
                // width: 0,
                marginLeft: -800,
                transition: { delay: 0.07, duration: 0.07 },
              }}
            >
              <motion.div
                className={`${classes.container} ${
                  ctx.darkMode ? classes.darkContainer : classes.lightContainer
                }`}
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                <Box display="flex" justifyContent="space-between">
                  {' '}
                  <div onClick={() => ctx.toggleMobile()}>
                    <MdClose />
                  </div>
                  <div onClick={() => ctx.toggleTheme()}>
                    {ctx.darkMode ? <BiSun /> : <BiMoon />}
                  </div>
                </Box>
                {/* {links.map((nav, id) => (
                  <div
                    key={id}
                    className={classes.linkText}
                    onClick={async () => {
                      ctx.toggleMobile();
                      if (nav.link === '/logout') {
                        dispatch('LOGOUT');
                        // router.push('/login');
                      } else {
                        // router.push('/dashboard' + nav.link);
                      }
                    }}
                  >
                    <svg width="0" height="0" style={{ position: 'absolute' }}>
                      <linearGradient
                        id="blue-gradient"
                        x1="100%"
                        y1="100%"
                        x2="0%"
                        y2="0%"
                      >
                        <stop stopColor="#8800ff" offset="0%" />
                        <stop stopColor="#DAA520" offset="100%" />
                      </linearGradient>
                    </svg>
                    <motion.a
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                      whileHover={{ scale: 1.1 }}
                      variants={itemVariants}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <nav.icon style={{ fill: 'url(#blue-gradient)' }} />
                      </span>{' '}
                      {nav.text}
                    </motion.a>
                  </div>
                ))} */}
              </motion.div>
            </motion.aside>
            <motion.div
              onClick={() => ctx.toggleMobile()}
              className={classes.closeNav}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="btn-container"></div>
    </main>
  );
};

export default MobileNav;
