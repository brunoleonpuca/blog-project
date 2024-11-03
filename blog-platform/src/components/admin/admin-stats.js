import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.platform.card};
  padding: ${props => props.theme.spacing.lg};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.platform.border};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.875rem;
`;

const AdminStats = ({ posts }) => {
  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(post => !post.draft).length,
    draftPosts: posts.filter(post => post.draft).length,
    categories: new Set(posts.map(post => post.category)).size
  };

  return (
    <StatsGrid>
      {Object.entries(stats).map(([key, value]) => (
        <StatCard
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <StatValue>{value}</StatValue>
          <StatLabel>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</StatLabel>
        </StatCard>
      ))}
    </StatsGrid>
  );
};

export default AdminStats;

