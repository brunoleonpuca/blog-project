import styled from 'styled-components';
import { motion } from 'framer-motion';
import { platformPageVariants } from '../../animations/variants';

const LayoutContainer = styled(motion.main)`
  max-width: ${props => props.theme.spacing.platform.container};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.platform.gutter};
  min-height: calc(100vh - 70px); // Adjust based on navbar height
`;

const PageHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-family: ${props => props.theme.typography.platform.title};
  color: ${props => props.theme.colors.platform.header};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PageDescription = styled.p`
  color: ${props => props.theme.colors.text}99;
  font-family: ${props => props.theme.typography.platform.content};
  max-width: 600px;
`;

const PageContent = styled.div`
  background-color: ${props => props.theme.colors.platform.card};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.platform.border};
`;

const PageLayout = ({
  title,
  description,
  children,
  showHeader = true,
  containerProps = {},
  contentProps = {}
}) => {
  return (
    <LayoutContainer
      variants={platformPageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...containerProps}
    >
      {showHeader && (
        <PageHeader>
          <PageTitle>{title}</PageTitle>
          {description && <PageDescription>{description}</PageDescription>}
        </PageHeader>
      )}
      <PageContent {...contentProps}>{children}</PageContent>
    </LayoutContainer>
  );
};

export default PageLayout;