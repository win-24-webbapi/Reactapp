import React, { useState, useEffect } from "react";
import styles from "./events.module.css";
import { eventService } from './services/api';

//*  ai hjälp , Formaterar datum i svenskt format med tid
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("sv-SE", { 
    year: "numeric", 
    month: "short", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit" 
  });
}

//* ai hjälp , konverterar priser till svensk valuta med felhantering
function formatPrice(price) {
  console.log('Formatting price:', price, typeof price); // Debug log
  if (price === undefined || price === null) return 'Pris ej satt';
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK'
  }).format(price);
}

//* ai hjälp, hanterar event-lista med laddningstillstånd och felhantering
export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getEvents();
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className={styles.eventsWrap}>Laddar events...</div>;
  if (error) return <div className={styles.eventsWrap}>Ett fel uppstod: {error}</div>;

  return (
    <div className={styles.eventsWrap}>
      <h2 className={styles.title}>Events</h2>
      <div className={styles.eventsList}>
        {events.map(event => {
          console.log('Rendering event:', event); // Debug log
          return (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#A8B4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="#A8B4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="#A8B4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="#A8B4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.eventMain}>
                <div className={styles.eventTitle}>{event.title}</div>
                <div className={styles.eventDesc}>{event.description}</div>
                <div className={styles.eventDetails}>
                  <div className={styles.eventDate}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {formatDate(event.startDate)}
                  </div>
                  <div className={styles.eventLocation}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {event.location}
                  </div>
                  <div className={styles.eventPrice}>
                    {formatPrice(event.price)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
