import styled from 'styled-components';

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text}99;
`;

const Category = styled.span`
  background-color: ${props => props.theme.colors.primary}11;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 4px;
  font-weight: 500;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  &::after {
    content: "•";
    margin-left: ${props => props.theme.spacing.xs};
  }
  
  &:last-child::after {
    content: "";
    margin-left: 0;
  }
`;

const PostMeta = ({ category, date, readTime }) => {
  return (
    <MetaContainer>
      <Category>{category}</Category>
      <MetaItem>{date}</MetaItem>
      <MetaItem>{readTime} read</MetaItem>
    </MetaContainer>
  );
};

export default PostMeta;