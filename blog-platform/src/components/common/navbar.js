import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled(motion.nav)`
  background: ${props => props.theme.colors.platform.card};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.platform.gutter};
  border-bottom: 1px solid ${props => props.theme.colors.platform.border};
`;

const NavContent = styled.div`
  max-width: ${props => props.theme.spacing.platform.container};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.typography.platform.title};
  font-weight: bold;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.platform.content};
  padding: ${props => props.theme.spacing.sm};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navbar = () => {
  return (
    <NavContainer
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <NavContent>
        <Logo to="/">Blog Platform</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;