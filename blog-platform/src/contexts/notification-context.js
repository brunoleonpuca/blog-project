import { createContext, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const NotificationItem = styled(motion.div)`
  background: ${props => {
    switch (props.type) {
      case 'success': return props.theme.colors.success || '#4CAF50';
      case 'error': return props.theme.colors.error;
      case 'warning': return props.theme.colors.secondary;
      default: return props.theme.colors.primary;
    }
  }};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: 4px;
  margin-bottom: ${props => props.theme.spacing.sm};
  min-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationContainer>
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <NotificationItem
              key={id}
              type={type}
              initial={{ opacity: 0, y: -50, x: 50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              {message}
            </NotificationItem>
          ))}
        </AnimatePresence>
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};