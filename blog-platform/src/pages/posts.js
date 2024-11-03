import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/page-layout';
import PostList from '../components/platform/post-list';
import Button from '../components/common/button';
import Modal from '../components/common/modal';
import PostForm from '../components/platform/post-form.js'; 
import { usePostContext } from '../contexts/post-context';

const CategoryTabs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.sm};
`;

const CategoryTab = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.platform.border};
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  font-family: ${props => props.theme.typography.platform.content};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'tutorial', label: 'Tutorials' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'news', label: 'News' },
  { id: 'tips', label: 'Tips & Tricks' }
];

const PostsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { loading, error } = usePostContext();

  return (
    <PageLayout
      title="Blog Posts"
      description="Explore our latest articles, tutorials, and insights."
    >
      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            isActive={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ color: 'red', marginBottom: '1rem' }}
        >
          {error}
        </motion.div>
      )}

      <PostList 
        category={selectedCategory}
        isLoading={loading}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Post"
        showFooter={false}
      >
        <PostForm onClose={() => setCreateModalOpen(false)} />
      </Modal>
    </PageLayout>
  );
};

export default PostsPage;