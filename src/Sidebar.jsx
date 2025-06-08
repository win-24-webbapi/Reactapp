import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import DashboardIcon from "./assets/icons/DashboardIcon";
import EventsIcon from "./assets/icons/EventsIcon";
import NotificationsIcon from "./assets/icons/NotificationsIcon";
import ProfileIcon from "./assets/icons/ProfileIcon";

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoArea}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 19L23 5" stroke="#F26CF9" strokeWidth="3" strokeLinecap="round"/>
          <path d="M7 27.5L13 17H19L25 27.5" stroke="#37437D" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <span className={styles.brandText}>Ventixe</span>
      </div>
      <ul className={styles.menuList}>
        <li>
          <NavLink to="/" end className={({isActive}) => isActive ? styles.active : undefined}>
            <span className={styles.icon}><DashboardIcon /></span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className={({isActive}) => isActive ? styles.active : undefined}>
            <span className={styles.icon}><EventsIcon /></span>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" className={({isActive}) => isActive ? styles.active : undefined}>
            <span className={styles.icon}><NotificationsIcon /></span>
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({isActive}) => isActive ? styles.active : undefined}>
            <span className={styles.icon}><ProfileIcon /></span>
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
} 