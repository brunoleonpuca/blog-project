import styled from 'styled-components';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { platformListItemVariants } from '../../animations/variants';
import PostMeta from './post-meta';

const Card = styled(motion.article)`
  background: ${props => props.theme.colors.platform.card};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.platform.border};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  font-family: ${props => props.theme.typography.platform.title};
  color: ${props => props.theme.colors.platform.header};
  margin: 0;
  font-size: 1.25rem;
`;

const Excerpt = styled.p`
  font-family: ${props => props.theme.typography.platform.content};
  color: ${props => props.theme.colors.text}99;
  margin: 0;
  line-height: 1.5;
`;

const PostCard = ({ 
  title, 
  excerpt, 
  category,
  date,
  readTime,
  onClick 
}) => {
  return (
    <Card
      variants={platformListItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
      <PostMeta 
        category={category}
        date={formatDistanceToNow(new Date(date), { addSuffix: true })}
        readTime={readTime}
      />
    </Card>
  );
};

export default PostCard;