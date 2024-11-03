import { useState, useEffect } from 'react';

// This would be replaced with actual API calls in a real implementation
const mockPosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and how to build your first application.',
    category: 'tutorial',
    date: '2024-03-01',
    readTime: '5 min',
    content: 'Full post content would go here...'
  },
  {
    id: 2,
    title: 'Advanced State Management',
    excerpt: 'Deep dive into modern state management techniques in React.',
    category: 'advanced',
    date: '2024-03-02',
    readTime: '8 min',
    content: 'Full post content would go here...'
  }
];

export const usePosts = (filter = 'latest', category = 'all') => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        let filteredPosts = [...mockPosts];
        
        // Apply category filter
        if (category !== 'all') {
          filteredPosts = filteredPosts.filter(post => post.category === category);
        }
        
        // Apply sorting
        filteredPosts.sort((a, b) => {
          if (filter === 'latest') {
            return new Date(b.date) - new Date(a.date);
          }
          // Add other sorting methods as needed
          return 0;
        });
        
        setPosts(filteredPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filter, category]);

  const addPost = async (newPost) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(prev => [...prev, { ...newPost, id: Date.now() }]);
      return true;
    } catch (err) {
      setError('Failed to add post');
      return false;
    }
  };

  return { posts, loading, error, addPost };
};