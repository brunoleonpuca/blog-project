import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { usePostContext } from '../../contexts/post-context';
import Button from '../common/button';

const PostTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const Th = styled.th`
  text-align: left;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 2px solid ${props => props.theme.colors.platform.border};
  color: ${props => props.theme.colors.text}99;
  font-weight: 500;
`;

const Td = styled.td`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.platform.border};
`;

const Tr = styled(motion.tr)`
  &:hover {
    background-color: ${props => props.theme.colors.primary}11;
  }
`;

const AdminPostList = () => {
  const { posts } = usePostContext();
  const [selectedPosts, setSelectedPosts] = useState(new Set());

  const togglePostSelection = (postId) => {
    const newSelection = new Set(selectedPosts);
    if (newSelection.has(postId)) {
      newSelection.delete(postId);
    } else {
      newSelection.add(postId);
    }
    setSelectedPosts(newSelection);
  };

  return (
    <div>
      {selectedPosts.size > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <Button variant="outline" size="small">
            Delete Selected ({selectedPosts.size})
          </Button>
        </div>
      )}
      
      <PostTable>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <Tr
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Td>{post.title}</Td>
              <Td>{post.category}</Td>
              <Td>{post.draft ? 'Draft' : 'Published'}</Td>
              <Td>
                <Button size="small" variant="outline">
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </PostTable>
    </div>
  );
};

export default AdminPostList;