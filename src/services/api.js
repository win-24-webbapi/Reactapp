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
    login: (credentials) => userApi.post('/auth/login', credentials),
    register: (userData) => userApi.post('/auth/register', userData),
    getProfile: () => userApi.get('/users/profile'),
    updateProfile: (data) => userApi.put('/users/profile', data)
};

// Event Service API calls
export const eventService = {
    getEvents: () => eventApi.get('/events'),
    getEvent: (id) => eventApi.get(`/events/${id}`),
    createEvent: (eventData) => eventApi.post('/events', eventData),
    updateEvent: (id, eventData) => eventApi.put(`/events/${id}`, eventData),
    deleteEvent: (id) => eventApi.delete(`/events/${id}`)
};

// Dashboard Service API calls
export const dashboardService = {
    getStats: () => dashboardApi.get('/dashboard/stats'),
    getRecentEvents: () => dashboardApi.get('/dashboard/recent-events'),
    getUpcomingEvents: () => dashboardApi.get('/dashboard/upcoming-events')
};

// Notification Service API calls
export const notificationService = {
    getNotifications: () => notificationApi.get('/notifications'),
    markAsRead: (id) => notificationApi.put(`/notifications/${id}/read`),
    deleteNotification: (id) => notificationApi.delete(`/notifications/${id}`)
}; 