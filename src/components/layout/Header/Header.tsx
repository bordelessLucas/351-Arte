import { useAuth } from '../../../contexts/AuthContext';
import { useSidebar } from '../../../contexts/SidebarContext';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImage from '../../../assets/Via Arte Logo.png';
import { paths } from '../../../routes/path';
import './Header.css';

const Header = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const { toggleSidebar, isOpen } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <div className="icon-wrapper">
            <FaBars className={`menu-icon ${!isOpen ? 'visible' : 'hidden'}`} />
            <FaTimes className={`menu-icon ${isOpen ? 'visible' : 'hidden'}`} />
          </div>
        </button>
        <div className="header-logo-container">
          <img src={logoImage} alt="Via Arte Logo" className="header-logo-image" />
          <h1 className="header-logo">Grupo Via Arte</h1>
        </div>
      </div>
      
      <div className="header-right">
        <div 
          className="user-info" 
          onClick={() => navigate(paths.userProfile)}
          style={{ cursor: 'pointer' }}
        >
          <div className="user-avatar">
            {userProfile?.displayName?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="user-name">
            {userProfile?.displayName || currentUser?.email || 'Usuário'}
          </span>
        </div>
        <button onClick={handleLogout} className="logout-button" aria-label="Logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span className="logout-text">Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

