import { useState } from 'react';
import * as React from 'react';
import { Bell, Mail, AlertCircle, Clock, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';
import {
  ForgeButton,
  ForgeIconButton,
  ForgeBadge,
  ForgeDivider,
  ForgePopover,
} from '@tylertech/forge-react';
import {
  defineButtonComponent,
  defineIconButtonComponent,
  defineBadgeComponent,
  defineDividerComponent,
  definePopoverComponent,
} from '@tylertech/forge';

defineButtonComponent();
defineIconButtonComponent();
defineBadgeComponent();
defineDividerComponent();
definePopoverComponent();

interface Notification {
  id: string;
  type: 'incident' | 'communication' | 'driver-response' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  severity?: 'Low' | 'Medium' | 'High';
  actionable?: boolean;
  incidentId?: string;
}

interface NotificationsDropdownProps {
  onNavigateToCommunication?: (incidentId: string) => void;
}

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'driver-response',
    title: 'Driver Response Received',
    description: 'Michael Chen replied to INC-2025-0042 (Sarah Mitchell - Seat Refusal)',
    timestamp: '10 mins ago',
    isRead: false,
    severity: 'Medium',
    actionable: true,
    incidentId: 'INC-2025-0042',
  },
  {
    id: 'notif-2',
    type: 'communication',
    title: 'Unanswered Driver Email',
    description: 'Lisa Anderson has not responded to inquiry about INC-2025-0041 (48 hours)',
    timestamp: '2 hours ago',
    isRead: false,
    severity: 'High',
    actionable: true,
    incidentId: 'INC-2025-0041',
  },
  {
    id: 'notif-3',
    type: 'incident',
    title: 'New High Severity Incident',
    description: 'Marcus Johnson - Emergency Exit Misuse on Bus 8',
    timestamp: '32 mins ago',
    isRead: false,
    severity: 'High',
    actionable: true,
  },
  {
    id: 'notif-4',
    type: 'communication',
    title: 'Unanswered Driver Email',
    description: 'David Park has not responded to inquiry about INC-2025-0040 (24 hours)',
    timestamp: '3 hours ago',
    isRead: false,
    severity: 'Medium',
    actionable: true,
    incidentId: 'INC-2025-0040',
  },
  {
    id: 'notif-5',
    type: 'incident',
    title: 'Incident Overdue',
    description: 'INC-2025-0035 (James Patterson) reported 24+ hours ago',
    timestamp: '5 hours ago',
    isRead: true,
    severity: 'Medium',
    actionable: true,
  },
  {
    id: 'notif-6',
    type: 'system',
    title: 'Weekly Report Ready',
    description: 'Incident summary report for week of March 8-15 is ready',
    timestamp: '1 day ago',
    isRead: true,
    actionable: false,
  },
];

export function NotificationsDropdown({ onNavigateToCommunication }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionable && notification.incidentId && onNavigateToCommunication) {
      onNavigateToCommunication(notification.incidentId);
      setIsOpen(false);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'incident': return <AlertCircle className="h-4 w-4" />;
      case 'communication': return <Mail className="h-4 w-4" />;
      case 'driver-response': return <MessageSquare className="h-4 w-4" />;
      case 'system': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'High': return 'var(--forge-theme-error)';
      case 'Medium': return 'var(--forge-theme-warning)';
      case 'Low': return 'var(--forge-theme-info)';
      default: return 'var(--forge-theme-text-low)';
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--forge-shape-full)',
        }}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              height: '20px',
              width: '20px',
              borderRadius: 'var(--forge-shape-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--forge-theme-error)',
              color: 'white',
              fontSize: '10px',
              fontWeight: 600,
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              zIndex: 50,
              width: '384px',
              backgroundColor: 'var(--forge-theme-surface)',
              borderRadius: 'var(--forge-shape-large)',
              boxShadow: 'var(--forge-elevation-8)',
              overflow: 'hidden',
              marginTop: 'var(--forge-spacing-xsmall)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: 'var(--forge-spacing-medium)',
              borderBottom: '1px solid var(--forge-theme-outline)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--forge-spacing-xsmall)' }}>
                <h3 className="forge-typography--heading4" style={{ margin: 0 }}>Notifications</h3>
                {unreadCount > 0 && (
                  <ForgeBadge theme="error">{unreadCount} New</ForgeBadge>
                )}
              </div>
              {unreadCount > 0 && (
                <ForgeButton variant="flat" onClick={markAllAsRead} style={{ fontSize: '14px' }}>
                  <CheckCircle className="h-4 w-4" style={{ marginRight: '4px' }} />
                  Mark all as read
                </ForgeButton>
              )}
            </div>

            {/* Notifications List */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: 'var(--forge-spacing-xlarge)', textAlign: 'center', color: 'var(--forge-theme-text-low)' }}>
                  <Bell className="h-12 w-12" style={{ margin: '0 auto var(--forge-spacing-small)', opacity: 0.4 }} />
                  <p className="forge-typography--body2">No notifications</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div key={notification.id}>
                    {index > 0 && <ForgeDivider />}
                    <button
                      onClick={() => handleNotificationClick(notification)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: 'var(--forge-spacing-medium)',
                        backgroundColor: notification.isRead ? 'transparent' : 'var(--forge-theme-primary-container-minimum)',
                        cursor: notification.actionable ? 'pointer' : 'default',
                        border: 'none',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 'var(--forge-spacing-small)' }}>
                        <div style={{ marginTop: '2px', color: getSeverityColor(notification.severity) }}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--forge-spacing-xsmall)', marginBottom: '4px' }}>
                            <span className="forge-typography--body2" style={{ fontWeight: notification.isRead ? 400 : 600, color: 'var(--forge-theme-text-high)' }}>
                              {notification.title}
                            </span>
                            {!notification.isRead && (
                              <div style={{ width: '8px', height: '8px', borderRadius: 'var(--forge-shape-full)', backgroundColor: 'var(--forge-theme-tertiary)', flexShrink: 0, marginTop: '4px' }} />
                            )}
                          </div>
                          <p className="forge-typography--label1" style={{ margin: '0 0 var(--forge-spacing-xsmall)', color: 'var(--forge-theme-text-medium)', lineHeight: 1.4 }}>
                            {notification.description}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="forge-typography--label1" style={{ color: 'var(--forge-theme-text-low)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock className="h-3 w-3" />
                              {notification.timestamp}
                            </span>
                            {notification.actionable && (
                              <span className="forge-typography--label1" style={{ color: 'var(--forge-theme-tertiary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                View <ArrowRight className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <>
                <ForgeDivider />
                <div style={{ padding: 'var(--forge-spacing-small)', textAlign: 'center' }}>
                  <ForgeButton variant="flat" style={{ width: '100%' }}>
                    View All Notifications
                  </ForgeButton>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
