import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/button';
import Modal from '../common/modal';
import { useNotification } from '../../contexts/notification-context';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.platform.border};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.platform.border};
  border-radius: 4px;
  font-size: 1.1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.platform.border};
  border-radius: 4px;
  min-height: 400px;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.platform.border};
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const MetadataSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const initialPostState = {
  title: '',
  excerpt: '',
  content: '',
  category: 'general',
  tags: [],
  status: 'draft',
  featuredImage: null
};

const PostEditor = ({ initialData, onSave, isEditing }) => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [postData, setPostData] = useState(initialData || initialPostState);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = useCallback((field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = async (asDraft = true) => {
    if (!postData.title.trim()) {
      addNotification('Please enter a title for your post', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        ...postData,
        status: asDraft ? 'draft' : 'published',
        lastUpdated: new Date().toISOString()
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExit = () => {
    if (isFormDirty()) {
      setShowExitPrompt(true);
    } else {
      navigate('/posts');
    }
  };

  const isFormDirty = () => {
    if (!initialData) {
      return Object.values(postData).some(value => value !== '');
    }
    return JSON.stringify(initialData) !== JSON.stringify(postData);
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <ButtonGroup>
          <Button variant="outline" onClick={handleExit}>
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            {isEditing ? 'Update' : 'Publish'}
          </Button>
        </ButtonGroup>
      </EditorHeader>

      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={postData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter post title"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="excerpt">Excerpt</Label>
        <TextArea
          id="excerpt"
          value={postData.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          placeholder="Enter a brief description"
          style={{ minHeight: '100px' }}
        />
      </FormGroup>

      <MetadataSection>
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            value={postData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="general">General</option>
            <option value="tutorial">Tutorial</option>
            <option value="news">News</option>
            <option value="technology">Technology</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={postData.tags.join(', ')}
            onChange={(e) => handleChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
            placeholder="Enter tags separated by commas"
          />
        </FormGroup>
      </MetadataSection>

      <FormGroup>
        <Label htmlFor="content">Content</Label>
        <TextArea
          id="content"
          value={postData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="Write your post content here..."
        />
      </FormGroup>

      <Modal
        isOpen={showExitPrompt}
        onClose={() => setShowExitPrompt(false)}
        title="Unsaved Changes"
      >
        <p>You have unsaved changes. Are you sure you want to leave?</p>
        <ButtonGroup>
          <Button variant="outline" onClick={() => setShowExitPrompt(false)}>
            Continue Editing
          </Button>
          <Button onClick={() => navigate('/posts')}>
            Leave Without Saving
          </Button>
        </ButtonGroup>
      </Modal>
    </EditorContainer>
  );
};

export default PostEditor;