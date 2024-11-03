import { createContext, useContext, useState, useCallback } from 'react';
import { useNotification } from './notification-context';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { addNotification } = useNotification();

  const addPost = useCallback(async (postData) => {
    try {
      // In a real app, this would be an API call
      const newPost = {
        ...postData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setPosts(prev => [...prev, newPost]);
      return newPost;
    } catch (error) {
      addNotification('Failed to create post', 'error');
      throw error;
    }
  }, [addNotification]);

  const updatePost = useCallback(async (id, postData) => {
    try {
      setPosts(prev => prev.map(post => 
        post.id === id 
          ? { ...post, ...postData, updatedAt: new Date().toISOString() }
          : post
      ));
    } catch (error) {
      addNotification('Failed to update post', 'error');
      throw error;
    }
  }, [addNotification]);

  const getPostById = useCallback((id) => {
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) throw new Error('Post not found');
    return post;
  }, [posts]);

  const deletePost = useCallback(async (id) => {
    try {
      setPosts(prev => prev.filter(post => post.id !== id));
      addNotification('Post deleted successfully', 'success');
    } catch (error) {
      addNotification('Failed to delete post', 'error');
      throw error;
    }
  }, [addNotification]);

  return (
    <PostContext.Provider 
      value={{ 
        posts, 
        addPost, 
        updatePost, 
        getPostById, 
        deletePost 
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};