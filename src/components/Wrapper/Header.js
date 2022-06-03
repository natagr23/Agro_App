import React, { useContext } from 'react';
import classes from './Header.module.css';
// import Link from 'next/link';
// import { Link } from 'react-router-dom';
import { BiHomeCircle, BiSearch } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';
import { MdNotificationsNone } from 'react-icons/md';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { Avatar } from '@mui/material';
// import { useGlobalContext } from '../../Context/context';
// import { useRouter } from 'next/router';
import { db } from '../Api/firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import { motion } from 'framer-motion';
// import SearchPanel from './SearchPanel';
import { useAuthState } from '../../Context/AuthContext_reducer';
import { ShopContext } from '../../Context/ShopContext';
import { Button } from '@mui/material';
const Header = () => {
  const ctx = useContext(ShopContext);
  // const { toggleNav, toggleMobile, darkMode, search, setSearch, isToggled } =
  //   useGlobalContext();

  const [parties, setParties] = React.useState([]);

  const [users, setUsers] = React.useState([]);
  const [partyResult, setPartyResult] = React.useState([]);
  const [userResult, setUserResult] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  // const router = useRouter();
  const { user } = useAuthState();
  React.useEffect(() => {
    ctx.setSearch('');
    const fetchUsers = async () => {
      const _users = [];
      const docRef = collection(db, 'users');
      await getDocs(docRef)
        .then((snap) => {
          snap.forEach((doc) => {
            const data = { ...doc.data(), id: doc.id };
            _users.push(data);
            setUsers(_users);
            // console.log(_users, "users");
            setLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // setSearch("");
    const fetchParties = async () => {
      const _parties = [];
      const docRef = collection(db, 'parties');
      await getDocs(docRef)
        .then((snap) => {
          snap.forEach((doc) => {
            const data = { ...doc.data(), id: doc.id };
            _parties.push(data);
            setParties(_parties);
            // console.log(_parties);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUsers();
    fetchParties();
  }, []);

  const filterQuery = (e) => {
    const isMatchParty = parties.filter((p) =>
      p.partyName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPartyResult(isMatchParty);

    const isMatchUsers = users.filter((p) => {
      const name = `${p.firstName} ${p.lastName}`;
      console.log(name);
      return (
        p.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
        name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setUserResult(isMatchUsers);
  };
  return (
    <div className={classes.stickyHeader}>
      <div
        className={`${classes.header} ${
          ctx.darkMode ? classes.dark : classes.light
        }`}
      >
        <span
          className={`${classes.menu} ${classes.lgMenu}`}
          onClick={() => ctx.toggleNav()}
        >
          <HiOutlineMenuAlt1 />
        </span>
        <span
          className={`${classes.menu} ${classes.mobileMenu}`}
          onClick={() => ctx.toggleMobile()}
        >
          <HiOutlineMenuAlt1 />
        </span>
        <div className={classes.header_group}>
          <div className={classes.search}>
            <BiSearch />
            <input
              type="search"
              value={ctx.search}
              placeholder="Search"
              onChange={(e) => {
                ctx.setSearch(e.target.value);
                // if (e.target.value) {
                //   router.replace({
                //     pathname: router.pathname,
                //     query: { ...router.query, q: e.target.value },
                //   });
                // } else {
                //   delete router.query.q;
                //   console.log(router);
                //   router.replace({
                //     pathname: router.pathname,
                //     query: { ...router.query },
                //   });
                // }

                filterQuery(e);
              }}
            />
          </div>
          <Button href="/">
            <a className={`${classes.icon} ${classes.noMobile}`}>
              <BiHomeCircle />
            </a>
          </Button>
          <Button href="/dashboard/start-party">
            <a className={`${classes.icon} ${classes.noMobile}`}>
              <FiPlusCircle />
            </a>
          </Button>
          <Button href="/dashboard/notifications">
            <a className={`${classes.icon}`}>
              <MdNotificationsNone />
            </a>
          </Button>

          <div className={classes.noMobile}>
            <Avatar
              src={user.profile ? user.profile.displayPics : ''}
              sx={{ width: 30, height: 30 }}
            >
              {user.profile &&
                !user.profile.displayPics &&
                user.profile.username.slice(0, 1).toUpperCase()}
            </Avatar>
          </div>
        </div>
      </div>
      {ctx.search && (
        <motion.div
          initial={{ opacity: 0 }}
          className={`${classes.searchContainer} ${
            !ctx.isToggled ? classes.shrinkSearch : classes.expandSearch
          } ${ctx.darkMode ? classes.darkContainer : ''}`}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.02, duration: 0.03 }}
        >
          Search results for{' '}
          <span style={{ fontWeight: '600' }}>{ctx.search}</span>
          <br />
          {/* <SearchPanel
            all={{ parties: partyResult, users: userResult }}
            users={userResult}
            parties={partyResult}
            loading={loading}
          /> */}
        </motion.div>
      )}
    </div>
  );
};

export default Header;
