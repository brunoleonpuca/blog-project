import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/button';
import { usePostContext } from '../../contexts/post-context';

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-family: ${props => props.theme.typography.platform.content};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.platform.border};
  border-radius: 4px;
  font-family: ${props => props.theme.typography.platform.content};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.platform.border};
  border-radius: 4px;
  font-family: ${props => props.theme.typography.platform.content};
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.platform.border};
  border-radius: 4px;
  font-family: ${props => props.theme.typography.platform.content};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const PostForm = ({ onClose, initialData = {} }) => {
  const { addPost } = usePostContext();
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    excerpt: initialData.excerpt || '',
    content: initialData.content || '',
    category: initialData.category || 'tutorial',
    readTime: initialData.readTime || '5 min'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addPost({
        ...formData,
        date: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="excerpt">Excerpt</Label>
        <TextArea
          id="excerpt"
          value={formData.excerpt}
          onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="content">Content</Label>
        <TextArea
          id="content"
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          value={formData.category}
          onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="tutorial">Tutorial</option>
          <option value="advanced">Advanced</option>
          <option value="news">News</option>
          <option value="tips">Tips & Tricks</option>
        </Select>
      </FormGroup>

      <ButtonGroup>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Post'}
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default PostForm;