import React from 'react';
import { MdDashboard } from "react-icons/md";
import { MdRealEstateAgent } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { RiContactsBook2Fill } from "react-icons/ri";

import Studentdata from '../assets/images/Studentdata';
export interface IUserProfileDataItem {
  icon: JSX.Element;
  title: string;
  desc: string;
  iconColor: string;
  iconBg: string;
}

export interface INavLinkItem {
  name: string;
  icon: JSX.Element;
}

export interface ISidebarLinkItems {
  title: string;
  links: INavLinkItem[];
}

export const links: ISidebarLinkItems[] = [
  {
    title: "Pages",
    links: [
    
      {
        name: "Life",
        icon: <MdDashboard className="text-2xl" />,
       
      },
      {
        name: "Gallery",
        icon: <GrGallery className="text-2xl" />,
      },
      {
        name: "Contact",
        icon: <RiContactsBook2Fill className="text-2xl" />,
      },

    ],
  },
];
