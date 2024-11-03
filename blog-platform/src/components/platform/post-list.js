import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from './post-card';
import Button from '../common/button';
import { platformListItemVariants } from '../../animations/variants';

const ListContainer = styled(motion.div)`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ListFilters = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.platform.border};
  font-family: ${props => props.theme.typography.platform.content};
  background-color: ${props => props.theme.colors.platform.card};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl} 0;
  color: ${props => props.theme.colors.text}99;
`;

const PostList = ({ category = 'all' }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('latest');
  
  // Mock data - would come from API in real implementation
  const posts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and how to build your first application.',
      category: 'tutorial',
      date: '2024-03-01',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Advanced State Management',
      excerpt: 'Deep dive into modern state management techniques in React.',
      category: 'advanced',
      date: '2024-03-02',
      readTime: '8 min'
    }
  ];

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const filteredPosts = posts.filter(post => 
    category === 'all' || post.category === category
  ).sort((a, b) => {
    if (filter === 'latest') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <ListContainer>
      <ListHeader>
        <ListFilters>
          <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </FilterSelect>
        </ListFilters>
        <Button size="small" onClick={() => navigate('/posts/new')}>
          Create Post
        </Button>
      </ListHeader>

      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              {...post}
              onClick={() => handlePostClick(post.id)}
              variants={platformListItemVariants}
            />
          ))
        ) : (
          <EmptyState>
            No posts found in this category.
          </EmptyState>
        )}
      </AnimatePresence>
    </ListContainer>
  );
};

export default PostList;