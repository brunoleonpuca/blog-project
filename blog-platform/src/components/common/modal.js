import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { platformModalVariants } from '../../animations/variants';
import Button from './button';  

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
`;

const ModalContainer = styled(motion.div)`
  background-color: ${props => props.theme.colors.platform.card};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.lg};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ModalTitle = styled.h2`
  font-family: ${props => props.theme.typography.platform.title};
  color: ${props => props.theme.colors.platform.header};
  margin: 0;
`;

const ModalContent = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
`;

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showFooter = true
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            variants={platformModalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <Button 
                variant="text" 
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </Button>
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
            {showFooter && (
              <ModalFooter>
                <Button variant="outline" onClick={onClose}>
                  {cancelText}
                </Button>
                <Button onClick={onConfirm}>
                  {confirmText}
                </Button>
              </ModalFooter>
            )}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;