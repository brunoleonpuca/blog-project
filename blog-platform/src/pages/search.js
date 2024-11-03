import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/page-layout';
import PostCard from '../components/platform/post-card';
import { LoadingSpinner } from '../components/common/loading-spinner';
import { usePostContext } from '../contexts/post-context';

const SearchForm = styled.form`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.platform.border};
  border-radius: 8px;
  font-size: 1.1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.platform.border};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ResultsInfo = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text}99;
`;

const NoResults = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text}99;
`;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState([]);
  const { posts, loading } = usePostContext();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const filters = searchParams.get('filters');
    if (filters) {
      setActiveFilters(filters.split(','));
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newQuery = formData.get('search');
    setSearchParams({ q: newQuery, filters: activeFilters.join(',') });
  };

  const toggleFilter = (filter) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(newFilters);
    setSearchParams({ q: query, filters: newFilters.join(',') });
  };

  const filteredPosts = posts.filter(post => {
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase());
    
    const matchesFilters = !activeFilters.length || 
      activeFilters.includes(post.category);
    
    return matchesQuery && matchesFilters;
  });

  return (
    <PageLayout title="Search">
      <SearchForm onSubmit={handleSearch}>
        <SearchInput 
          name="search"
          defaultValue={query}
          placeholder="Search posts..."
          autoFocus
        />
      </SearchForm>

      <FilterSection>
        {['tutorial', 'news', 'advanced', 'tips'].map(filter => (
          <FilterButton
            key={filter}
            isActive={activeFilters.includes(filter)}
            onClick={() => toggleFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </FilterButton>
        ))}
      </FilterSection>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ResultsInfo>
            Found {filteredPosts.length} results
            {query && ` for "${query}"`}
          </ResultsInfo>

          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredPosts.map(post => (
                  <PostCard key={post.id} {...post} />
                ))}
              </motion.div>
            ) : (
              <NoResults
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No posts found. Try adjusting your search or filters.
              </NoResults>
            )}
          </AnimatePresence>
        </>
      )}
    </PageLayout>
  );
};

export default SearchPage;