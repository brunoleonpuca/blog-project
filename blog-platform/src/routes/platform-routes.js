import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/home';
import Posts from '../pages/posts';
import PostDetail from '../pages/post-detail';
import PostManagement from '../pages/post-management';
import Category from '../pages/category';
import Search from '../pages/search';
import AuthorProfile from '../pages/author-profile';
import Admin from '../pages/admin';
import Settings from '../pages/settings';

const PlatformRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/new" element={<PostManagement />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostManagement />} />
        <Route path="/category/:categorySlug" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/author/:authorId" element={<AuthorProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AnimatePresence>
  );
};

export default PlatformRoutes;