import { useState } from 'react';
import styled from 'styled-components';
import PageLayout from '../components/layout/page-layout';
import { usePostContext } from '../contexts/post-context';
import Modal from '../components/common/modal';
import PostForm from '../components/platform/post-form';
import AdminPostList from '../components/admin/admin-post-list';
import AdminStats from '../components/admin/admin-stats';

const AdminContainer = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xl};
`;

const AdminActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AdminPage = () => {
  const { posts } = usePostContext();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <PageLayout
      title="Admin Dashboard"
      description="Manage your blog posts and view analytics"
    >
      <AdminContainer>
        <AdminStats posts={posts} />
        <AdminPostList />
        
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Create New Post"
          showFooter={false}
        >
          <PostForm onClose={() => setCreateModalOpen(false)} />
        </Modal>
      </AdminContainer>
    </PageLayout>
  );
};

export default AdminPage;