import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../types';
import { api } from '../services/api';
import { Bell, CheckCircle, Mail, MessageSquare, Smartphone, Clock, Loader2 } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await api.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      handleMarkRead(notification.id);
    }
    navigate(`/lead/${notification.leadId}`);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getChannelIcon = (channel: string, active: boolean) => {
    const iconClass = active ? 'text-green-600' : 'text-gray-300';
    switch (channel) {
      case 'whatsapp':
        return <MessageSquare className={`w-4 h-4 ${iconClass}`} />;
      case 'email':
        return <Mail className={`w-4 h-4 ${iconClass}`} />;
      case 'app':
        return <Smartphone className={`w-4 h-4 ${iconClass}`} />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
              : 'All caught up!'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200 bg-blue-50">
            <p className="text-sm text-blue-700 mb-1">Unread</p>
            <p className="text-2xl font-bold text-blue-900">{unreadCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-200 bg-green-50">
            <p className="text-sm text-green-700 mb-1">Read</p>
            <p className="text-2xl font-bold text-green-900">{notifications.length - unreadCount}</p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`bg-white rounded-lg border p-5 cursor-pointer transition-all hover:shadow-md hover:border-blue-300 ${
                  notification.read
                    ? 'border-gray-200 opacity-75'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.read ? 'bg-gray-100' : 'bg-blue-100'
                  }`}>
                    {notification.read ? (
                      <CheckCircle className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Bell className="w-5 h-5 text-blue-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{notification.leadName}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{notification.message}</p>

                    {/* Channel Status */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">Sent via:</span>
                      <div className="flex items-center gap-2">
                        {getChannelIcon('whatsapp', notification.channels.whatsapp)}
                        {getChannelIcon('email', notification.channels.email)}
                        {getChannelIcon('app', notification.channels.app)}
                      </div>
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mark All as Read */}
        {unreadCount > 0 && (
          <div className="mt-6">
            <button
              onClick={() => {
                notifications.forEach(n => {
                  if (!n.read) handleMarkRead(n.id);
                });
              }}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark All as Read
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
