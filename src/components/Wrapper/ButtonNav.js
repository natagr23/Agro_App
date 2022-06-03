import React, { useContext } from 'react';
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import { MdNotificationsNone, MdOutlineFavoriteBorder } from 'react-icons/md';
import { makeStyles } from '@mui/styles';
import { useAuthState } from '../../Context/AuthContext_reducer';
import { useGlobalContext } from '../../Context/context';
// import { useRouter } from 'next/router';

import { IoMdAddCircleOutline } from 'react-icons/io';
import { Avatar } from '@mui/material';
import { ShopContext } from '../../Context/ShopContext';

export default function LabelBottomNavigation() {
  const ctx = useContext(ShopContext);
  // const router = useRouter();
  // const [value, setValue] = React.useState(router.pathname);
  // const { darkMode } = useGlobalContext();

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   // router.push(newValue);
  // };

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: '100%',
  //     backgroundColor: ctx.darkMode ? '#373737ff !important' : '#fff',

  //     '& .MuiBottomNavigationAction-wrapper': {
  //       fontSize: '25px',
  //       color: ctx.darkMode ? '#fff' : '#000',
  //       [theme.breakpoints.down(376)]: {
  //         width: '50px',
  //       },
  //     },
  //     '& .MuiBottomNavigationAction-root.MuiBottomNavigationAction-iconOnly': {
  //       paddingTop: '10px',
  //     },
  //     '& .MuiBottomNavigationAction-root': {
  //       [theme.breakpoints.down(376)]: {
  //         minWidth: '50px',
  //       },
  //     },
  //     '& .MuiBottomNavigationAction-root.Mui-selected': {
  //       '& .MuiBottomNavigationAction-wrapper': {
  //         fontSize: '30px',
  //         color: '#8800ff !important',
  //       },
  //     },
  //   },
  // }));
  // const _class = useStyles();
  const { user } = useAuthState();
  return (
    <BottomNavigation
      // className={_class.root}
      sx={{ width: 500 }}
      // value={value}
      // onChange={handleChange}
    >
      <BottomNavigationAction
        // label="Recents"
        value="/dashboard"
        // icon={value === '/dashboard' ? <AiFillHome /> : <AiOutlineHome />}
      />
      <BottomNavigationAction
        // label="Favorites"
        value="/dashboard/reserved-parties"
        icon={
          // value === '/dashboard/reserved-parties' ? (
          //   <MdFavorite />
          // ) :
          //  (

          <MdOutlineFavoriteBorder />
          // )
        }
      />
      <BottomNavigationAction
        // label="Nearby"
        value="/dashboard/parties/new"
        icon={
          // value === '/dashboard/parties/new' ? (
          //   <IoMdAddCircle />
          // ) :

          <IoMdAddCircleOutline />
        }
      />
      <BottomNavigationAction
        // label="Folder"
        value="/dashboard/notifications"
        icon={
          // value === '/dashboard/notifications' ? (
          //   <MdNotifications />
          // ) :

          <MdNotificationsNone />
        }
      />
      <BottomNavigationAction
        // label="Folder"
        value="/dashboard/profile"
        icon={
          <Avatar
            sx={{
              // height: value === '/dashboard/profile' ? 40 : 30,
              // width: value === '/dashboard/profile' ? 40 : 30,

              height: 30,
              width: 30,
            }}
            src={
              user.profile &&
              user.profile.displayPics &&
              user.profile.displayPics
            }
          >
            {user.profile &&
              !user.profile.displayPics &&
              user.profile.firstName.slice(0, 1).toUpperCase()}
          </Avatar>
        }
      />
    </BottomNavigation>
  );
}
