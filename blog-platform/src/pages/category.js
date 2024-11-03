import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/page-layout';
import PostList from '../components/platform/post-list';
import { LoadingSpinner } from '../components/common/loading-spinner';
import { usePostContext } from '../contexts/post-context';

const CategoryHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const CategoryDescription = styled.p`
  color: ${props => props.theme.colors.text}99;
  max-width: 600px;
  margin: 0 auto;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.md};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text}99;
`;

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { posts, loading } = usePostContext();

  const categoryPosts = posts.filter(post => post.category === categorySlug);
  const totalPosts = categoryPosts.length;
  const totalAuthors = new Set(categoryPosts.map(post => post.author)).size;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout>
      <CategoryHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>{categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}</h1>
        <CategoryDescription>
          Explore our collection of articles about {categorySlug}.
        </CategoryDescription>
        <CategoryStats>
          <StatItem>
            <StatValue>{totalPosts}</StatValue>
            <StatLabel>Posts</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{totalAuthors}</StatValue>
            <StatLabel>Authors</StatLabel>
          </StatItem>
        </CategoryStats>
      </CategoryHeader>

      <PostList category={categorySlug} />
    </PageLayout>
  );
};

export default CategoryPage;