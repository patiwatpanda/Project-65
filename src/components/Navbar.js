import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Sidenav } from './Sidenav';
import './Navbar.css';
import { IconContext } from 'react-icons'
//import { reactLocalStorage } from 'reactjs-localstorage';
import * as IoIcons from "react-icons/io";
import { Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { reactLocalStorage } from "reactjs-localstorage";
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import { db } from "../firebase-config";
import { fontSize } from '@mui/system';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  where,
  documentId
} from "firebase/firestore";
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
function Navbar() {
  const linkpicture = reactLocalStorage.getObject("Xuser")[0]?.image
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const menuId = 'primary-search-account-menu';
    const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const id = reactLocalStorage.getObject("Xuser")[0]?.id
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

  };
  
  const handleLogoutClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    FLogout();
  };
  

  function FLogout() {
    reactLocalStorage.remove('Xuser');
    window.location.href = "/"
  }

  const handleMenuCloseProfile = () => {
    
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.href = "/profile"
  };
  const handleMenuCloseEdit = async () => {
    
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.href = "/editprofile"
    /* 
    const q = query(collection(db, "user"), where(documentId(), "==", id), );
    const data = await getDocs(q);
    console.log(data)
  
    reactLocalStorage.setObject('Xuser', data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    window.location.href = "/editprofile"*/
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
   // const name = reactLocalStorage.getObject("Xuser")[0]?.user
   // const role = reactLocalStorage.getObject("Xuser")[0]?.role
    //console.log(role)
/*
    function FLogout(){
        reactLocalStorage.remove('Xuser');
        window.location.href = "/login"
    }
    */
      /*
                    <div>
                        <div className='name'>{name}</div>
                        <div className='role'>{role}</div>
                    </div>*/
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handleMenuCloseProfile}>Profile</MenuItem>

      <MenuItem onClick={handleMenuCloseEdit}>Edit</MenuItem>
      <MenuItem onClick={handleLogoutClose}>LogOut</MenuItem>
    </Menu>
  );

  
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
                    
    return (
        
        <IconContext.Provider value={{ color: '#fff' }} >

                <div className="navbar">

                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                        
                    </Link>
                    <Typography
            variant="h5"
            noWrap
            component="div"
           
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } ,ml: '20px' ,color:'#fff'}}
          >
            ?????????????????????????????????
          </Typography>
                    <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
       
          </IconButton>
         
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search???"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 ,justifyContent: 'flex-end' }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
           <Avatar alt="Remy Sharp" src={linkpicture}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMobileMenu}
      {renderMenu}
                </div>
                
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-item' onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                            
                        </li>
                        {Sidenav.map((item, index) => {

                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                                
                            )
                        })}
                     <li className='nav-text'>
<Link to={"/"}>
  {<IoIcons.IoIosLogIn />}
  <span >{"LogOut"}</span>
</Link>
</li>
                        
                        
                    </ul>
         
                </nav>
                
            </IconContext.Provider>

    )
}

export default Navbar;
  /* {reactLocalStorage.getObject("Xuser")[0] ? <li className='nav-text'>
  <Link  to={"/login"} onClick={FLogout}>
  {<IoIcons.IoIosLogOut />}
  <span>{"Logout"}</span>
</Link>
</li> : <li className='nav-text'>
<Link to={"/login"}>
  {<IoIcons.IoIosLogIn />}
  <span>{"LogIn"}</span>
</Link>
</li>}*/