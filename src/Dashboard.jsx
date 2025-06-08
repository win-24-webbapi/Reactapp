import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { dashboardService, eventService } from './services/api';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("sv-SE", { 
    year: "numeric", 
    month: "short", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit" 
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, eventsResponse] = await Promise.all([
          dashboardService.getStats(),
          eventService.getEvents()
        ]);
        
        setStats(statsResponse.data);
        setEvents(eventsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className={styles.dashboardRoot}>
      <div className={styles.loadingMessage}>Loading dashboard...</div>
    </div>;
  }

  //*AIchat, Skapar responsiv dashboard med dynamisk rendering av events och statistik
  return (
    <div className={styles.dashboardRoot}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <div onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
          <span className={styles.logoWrap}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
          </span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchWrap}>
            <input className={styles.searchField} placeholder="Search events, bookings..." />
          </div>
          <button 
            className={styles.headerIconBtn}
            onClick={() => navigate('/profile')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#DDDAF9" stroke="#707DBF" strokeWidth="2"/>
              <ellipse cx="12" cy="17" rx="6" ry="3" fill="#DDDAF9" stroke="#707DBF" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Error Messages */}
      {error && (
        <div className={styles.errorMessage}>
          Error loading dashboard: {error}
        </div>
      )}

      {/* Stat Cards */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: "var(--vt-primary-40)"}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#F26CF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V6" stroke="#F26CF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V6" stroke="#F26CF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="#F26CF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={styles.statTitle}>Total Events</span>
          <span className={styles.statValue}>{stats?.totalEvents}</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{background: "var(--vt-yellow-90)"}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFCA39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={styles.statTitle}>Total Revenue</span>
          <span className={styles.statValue}>${stats?.totalRevenue}</span>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <span className={styles.sectionTitle}>Upcoming Events</span>
        <div className={styles.eventsGrid}>
          {events.map(event => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventImage}>
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} />
                ) : (
                  <div className={styles.eventImagePlaceholder} />
                )}
              </div>
              <div className={styles.eventInfo}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className={styles.eventDetails}>
                  <span>{formatDate(event.startDate)}</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Chart Section */}
      <section className={styles.chartSection}>
        <span className={styles.sectionTitle}>Sales Overview</span>
        <svg viewBox="0 0 220 80" width="220" height="80" className={styles.chartSvg}>
          <rect x="10" y="30" width="24" height="40" rx="3" fill="var(--vt-primary-90)"/>
          <rect x="46" y="40" width="24" height="30" rx="3" fill="var(--vt-primary-40)"/>
          <rect x="82" y="24" width="24" height="46" rx="3" fill="var(--vt-primary-100)"/>
          <rect x="118" y="50" width="24" height="20" rx="3" fill="var(--vt-secondary-70)"/>
          <rect x="154" y="36" width="24" height="34" rx="3" fill="var(--vt-primary-50)"/>
          <rect x="190" y="60" width="24" height="10" rx="3" fill="var(--vt-secondary-50)"/>
        </svg>
      </section>
    </div>
  );
}
