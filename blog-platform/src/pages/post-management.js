import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageLayout from '../components/layout/page-layout';
import PostEditor from '../components/platform/post-editor';
import { usePostContext } from '../contexts/post-context';
import { useNotification } from '../contexts/notification-context';
import { LoadingSpinner } from '../components/common/loading-spinner';

const EditorWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PostManagementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPost, updatePost, getPostById } = usePostContext();
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        setLoading(true);
        try {
          const postData = await getPostById(id);
          setPost(postData);
        } catch (error) {
          addNotification('Failed to load post', 'error');
          navigate('/posts');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, getPostById, navigate, addNotification]);

  const handleSave = async (postData) => {
    try {
      if (isEditing) {
        await updatePost(id, postData);
        addNotification('Post updated successfully', 'success');
      } else {
        await addPost(postData);
        addNotification('Post created successfully', 'success');
      }
      navigate('/posts');
    } catch (error) {
      addNotification(
        `Failed to ${isEditing ? 'update' : 'create'} post`,
        'error'
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout
      title={isEditing ? 'Edit Post' : 'Create New Post'}
      description={
        isEditing
          ? 'Update your existing post'
          : 'Share your thoughts with the world'
      }
    >
      <EditorWrapper>
        <PostEditor
          initialData={post}
          onSave={handleSave}
          isEditing={isEditing}
        />
      </EditorWrapper>
    </PageLayout>
  );
};

export default PostManagementPage;