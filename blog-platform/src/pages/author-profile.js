import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/page-layout';
import PostList from '../components/platform/post-list';
import { usePostContext } from '../contexts/post-context';

const ProfileHeader = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${props => props.theme.colors.platform.border};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Name = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.platform.header};
`;

const Bio = styled.p`
  color: ${props => props.theme.colors.text}99;
  margin: 0;
`;

const Stats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
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

const TabContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.platform.border};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => 
    props.isActive ? props.theme.colors.primary : 'transparent'
  };
  color: ${props => 
    props.isActive ? props.theme.colors.primary : props.theme.colors.text
  };
  cursor: pointer;
  margin-right: ${props => props.theme.spacing.lg};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const AuthorProfilePage = () => {
  const { authorId } = useParams();
  const { posts } = usePostContext();
  
  // Mock author data - in real app, this would come from an API
  const author = {
    id: authorId,
    name: 'John Doe',
    bio: 'Technical writer and software developer with a passion for teaching and learning.',
    avatar: '/api/placeholder/150/150',
    joinDate: '2023-01-01'
  };

  const authorPosts = posts.filter(post => post.authorId === authorId);
  
  const stats = {
    posts: authorPosts.length,
    views: authorPosts.reduce((sum, post) => sum + (post.views || 0), 0),
    likes: authorPosts.reduce((sum, post) => sum + (post.likes || 0), 0)
  };

  return (
    <PageLayout showHeader={false}>
      <ProfileHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Avatar>
          <img src={author.avatar} alt={author.name} />
        </Avatar>
        
        <ProfileInfo>
          <Name>{author.name}</Name>
          <Bio>{author.bio}</Bio>
          
          <Stats>
            <StatItem>
              <StatValue>{stats.posts}</StatValue>
              <StatLabel>Posts</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.views}</StatValue>
              <StatLabel>Views</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.likes}</StatValue>
              <StatLabel>Likes</StatLabel>
            </StatItem>
          </Stats>
        </ProfileInfo>
      </ProfileHeader>

      <TabContainer>
        <Tab isActive>Posts</Tab>
        <Tab>About</Tab>
      </TabContainer>

      <PostList authorId={authorId} />
    </PageLayout>
  );
};

export default AuthorProfilePage;