import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileSidebar from "../components/profile-sidebar/profile-sidebar";

function Profile() {
  return (
    <main className={styles.wrapper}>
      <ProfileSidebar />
      <Outlet />
    </main>
  );
}

export default Profile;
