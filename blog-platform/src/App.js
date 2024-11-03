import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global-styles';
import { NotificationProvider } from './contexts/notification-context';
import { PostProvider } from './contexts/post-context';
import ErrorBoundary from './components/common/error-boundary';
import Navbar from './components/common/navbar';
import PlatformRoutes from './routes/platform-routes';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NotificationProvider>
          <PostProvider>
            <BrowserRouter>
              <Navbar />
              <PlatformRoutes />
            </BrowserRouter>
          </PostProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;