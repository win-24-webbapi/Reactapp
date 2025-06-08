import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { userService } from './services/api';

//* AI, Formaterar datum i svenskt format för användarprofil
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("sv-SE", {
    year: "numeric", month: "short", day: "numeric"
  });
}

//* Ai, Visar användarprofil med dynamisk datahämtning
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getUserByEmail("test@example.com");
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className={styles.profileWrap}>Loading profile...</div>;
  }

  if (error) {
    return <div className={styles.profileWrap}>Error: {error}</div>;
  }

  if (!user) {
    return <div className={styles.profileWrap}>No profile data available</div>;
  }

  return (
    <div className={styles.profileWrap}>
      <div className={styles.profileHeader}>
        <h2>User Profile</h2>
      </div>
      <div className={styles.profileCard}>
        <div className={styles.infoCol}>
          <div className={styles.nameRow}>
            <span className={styles.displayName}>{user.firstName} {user.lastName}</span>
            <span className={styles.username}>@{user.username}</span>
          </div>
          <div className={styles.fieldRow}><span className={styles.fieldLabel}>Email:</span>{user.email}</div>
          <div className={styles.fieldRow}><span className={styles.fieldLabel}>Account created:</span>{formatDate(user.createdAt)}</div>
          {user.lastLoginAt && (
            <div className={styles.fieldRow}><span className={styles.fieldLabel}>Last login:</span>{formatDate(user.lastLoginAt)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
