import { MdDashboard } from "react-icons/md";
import { MdRealEstateAgent } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { RiContactsBook2Fill } from "react-icons/ri";

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
  link: string;
}

export interface ISidebarLinkItems {
  title: string;
  links: INavLinkItem[];
}
let linksArray: INavLinkItem[] = [];

linksArray = [
  {
    name: "Dashboard",
    icon: <MdDashboard className="text-2xl" />,
    link: "",
  },
  {
    name: "Life at alliedge",
    icon: <MdRealEstateAgent className="text-2xl" />,
    link: "property",
  },
  {
    name: "Gallery",
    icon: <GrGallery className="text-2xl" />,
    link: "gallery",
  },
  {
    name: "Contact us",
    icon: <RiContactsBook2Fill className="text-2xl" />,
    link: "contactus",
  },
];

export const links: ISidebarLinkItems[] = [
  {
    title: "MENU",
    links: linksArray,
  },
];
