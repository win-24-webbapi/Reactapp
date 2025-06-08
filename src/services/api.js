import axios from 'axios';
import { REST_API } from '../config/api';

// Create axios instances for each service
const userApi = axios.create({
    baseURL: REST_API.USER_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

const eventApi = axios.create({
    baseURL: REST_API.EVENT_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

const dashboardApi = axios.create({
    baseURL: REST_API.DASHBOARD_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

const notificationApi = axios.create({
    baseURL: REST_API.NOTIFICATION_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

// User Service API calls
export const userService = {
    getUser: (id) => userApi.get(`/user/${id}`),
    getUserByEmail: (email) => userApi.get(`/user/email/${email}`),
    createUser: (userData) => userApi.post('/user', userData),
    updateUser: (id, userData) => userApi.put(`/user/${id}`, userData),
    deleteUser: (id) => userApi.delete(`/user/${id}`)
};

// Event Service API calls
export const eventService = {
    getEvents: () => eventApi.get('/event'),
    getEvent: (id) => eventApi.get(`/event/${id}`),
    createEvent: (eventData) => eventApi.post('/event', eventData),
    updateEvent: (id, eventData) => eventApi.put(`/event/${id}`, eventData),
    deleteEvent: (id) => eventApi.delete(`/event/${id}`)
};

// Dashboard Service API calls
export const dashboardService = {
    getStats: () => dashboardApi.get('/dashboard/stats'),
    getRecentEvents: () => dashboardApi.get('/dashboard/recent-events'),
    getUpcomingEvents: () => dashboardApi.get('/dashboard/upcoming-events')
};

// Notification Service API calls
export const notificationService = {
    getNotifications: (userId) => notificationApi.get(`/notification/user/${userId}`),
    getNotification: (id) => notificationApi.get(`/notification/${id}`),
    createNotification: (notificationData) => notificationApi.post('/notification', notificationData),
    updateNotification: (id, notificationData) => notificationApi.put(`/notification/${id}`, notificationData),
    deleteNotification: (id) => notificationApi.delete(`/notification/${id}`),
    markAsRead: (id) => notificationApi.put(`/notification/${id}/mark-as-read`),
    markAllAsRead: (userId) => notificationApi.put(`/notification/user/${userId}/mark-all-as-read`)
}; 