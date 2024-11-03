import styled from 'styled-components';
import { motion } from 'framer-motion';
import { platformPageVariants } from '../animations/variants';
import PostList from '../components/platform/post-list';

const HomeContainer = styled(motion.div)`
  max-width: ${props => props.theme.spacing.platform.container};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.platform.gutter};
`;

const HomeTitle = styled.h1`
  font-family: ${props => props.theme.typography.platform.title};
  color: ${props => props.theme.colors.platform.header};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Home = () => {
  return (
    <HomeContainer
      variants={platformPageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HomeTitle>Welcome to the Blog Platform</HomeTitle>
      <PostList />
    </HomeContainer>
  );
};

export default Home;