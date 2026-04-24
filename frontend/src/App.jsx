import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import DSA from './pages/DSA';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProfile from './pages/admin/AdminProfile';
import AdminDSA from './pages/admin/AdminDSA';
import AdminBlog from './pages/admin/AdminBlog';
import AdminContacts from './pages/admin/AdminContacts';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeInitializer from './components/ThemeInitializer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <ThemeInitializer />
      <div className="App">
        <Routes>
          {/* Public Routes - No authentication required */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="dsa" element={<DSA />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Login Route - Public */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes - Authentication required */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="dsa" element={<AdminDSA />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>
          </Route>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
