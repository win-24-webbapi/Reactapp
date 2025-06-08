import React, { useState, useEffect } from "react";
import styles from "./notifications.module.css";
import { notificationService } from './services/api';

//* AI, Formaterar datum för notifieringar i svenskt format
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

//* AI, Hanterar notifieringslista med laddningstillstånd och felhantering
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //* AI, Hämtar notifieringar från API med felhantering
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService.getNotifications(1);
        setNotifications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div className={styles.notificationsWrap}>Laddar notifieringar...</div>;
  if (error) return <div className={styles.notificationsWrap}>Ett fel uppstod: {error}</div>;

  return (
    <div className={styles.notificationsWrap}>
      <h2 className={styles.title}>Notifications</h2>
      <div className={styles.notificationsList}>
        {notifications.map(noti => (
          <div key={noti.id} className={styles.notiCard + (noti.isRead ? '' : ' ' + styles.unread)}>
            <div className={styles.notiIcon}><svg width="28" height="28"><circle cx="14" cy="14" r="12" fill="#A8B4D0" /><circle cx="20" cy="10" r="4" fill="#F589FA" /></svg></div>
            <div className={styles.notiMain}>
              <div className={styles.notiTitle}>{noti.title}</div>
              <div className={styles.notiMsg}>{noti.message}</div>
              <div className={styles.notiDate}>{formatDate(noti.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
