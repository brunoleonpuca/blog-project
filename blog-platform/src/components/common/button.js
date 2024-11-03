import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonWrapper = styled(motion.button)`
  padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.typography.platform.content};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  /* Variants */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: ${props.theme.colors.secondary};
          color: ${props.theme.colors.text};
          &:hover {
            background-color: ${props.theme.colors.secondary}ee;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${props.theme.colors.primary};
          border: 1px solid ${props.theme.colors.primary};
          &:hover {
            background-color: ${props.theme.colors.primary}11;
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${props.theme.colors.primary};
          padding: ${props.theme.spacing.xs};
          &:hover {
            background-color: ${props.theme.colors.primary}11;
          }
        `;
      default:
        return `
          background-color: ${props.theme.colors.primary};
          color: white;
          &:hover {
            background-color: ${props.theme.colors.primary}ee;
          }
        `;
    }
  }}

  /* Sizes */
  ${props => {
    switch (props.size) {
      case 'small':
        return `
          font-size: 0.875rem;
          padding: ${props.theme.spacing.xs} ${props.theme.spacing.sm};
        `;
      case 'large':
        return `
          font-size: 1.125rem;
          padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
        `;
      default:
        return `
          font-size: 1rem;
          padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
        `;
    }
  }}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false, 
  type = 'button',
  ...props 
}) => {
  return (
    <ButtonWrapper
      as={motion.button}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;