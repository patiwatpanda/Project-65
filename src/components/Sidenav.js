import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
export const Sidenav = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'เพิ่มอาจารย์ผู้สอน',
        path: '/addteach',
        icon: <AccountCircleIcon />,
        cName: 'nav-text'
    },
    {
        title: 'เพิ่มวิชา',
        path: '/addnewsubject',
        icon: <ReceiptLongIcon/>,
        cName: 'nav-text'
    },

]