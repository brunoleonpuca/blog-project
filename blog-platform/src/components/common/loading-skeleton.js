import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.platform.border} 8%,
    ${props => props.theme.colors.platform.card} 18%,
    ${props => props.theme.colors.platform.border} 33%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 2s linear infinite;
  border-radius: 4px;
`;

const PostCardSkeleton = styled(SkeletonBase)`
  height: 200px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TextLineSkeleton = styled(SkeletonBase)`
  height: 16px;
  margin-bottom: ${props => props.theme.spacing.sm};
  width: ${props => props.width || '100%'};
`;

export const PostSkeleton = () => (
  <div>
    <PostCardSkeleton />
    <TextLineSkeleton width="60%" />
    <TextLineSkeleton width="40%" />
  </div>
);

export const TextSkeleton = ({ lines = 3, width }) => (
  <>
    {Array(lines).fill(0).map((_, index) => (
      <TextLineSkeleton 
        key={index} 
        width={width || `${Math.random() * 40 + 60}%`}
      />
    ))}
  </>
);