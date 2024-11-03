import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/page-layout';
import Button from '../components/common/button';
import PostMeta from '../components/platform/post-meta';
import { usePostContext } from '../contexts/post-context';

const PostContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PostTitle = styled.h1`
  font-family: ${props => props.theme.typography.platform.title};
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.platform.header};
`;

const PostBody = styled.div`
  font-family: ${props => props.theme.typography.platform.content};
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing.xl};

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const BackButton = styled(Button)`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, loading, error } = usePostContext();

  const post = posts.find(p => p.id.toString() === id);

  if (loading) {
    return <PageLayout title="Loading..." />;
  }

  if (error || !post) {
    return (
      <PageLayout title="Post Not Found">
        <Button variant="outline" onClick={() => navigate('/posts')}>
          Back to Posts
        </Button>
      </PageLayout>
    );
  }

  return (
    <PageLayout showHeader={false}>
      <PostContent>
        <BackButton 
          variant="outline"
          onClick={() => navigate('/posts')}
        >
          ← Back to Posts
        </BackButton>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PostTitle>{post.title}</PostTitle>
          
          <PostMeta
            category={post.category}
            date={post.date}
            readTime={post.readTime}
          />
          
          <PostBody>{post.content}</PostBody>
        </motion.article>
      </PostContent>
    </PageLayout>
  );
};

export default PostDetailPage;