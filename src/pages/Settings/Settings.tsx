import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { FaUser, FaLock, FaBell, FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<string>('account');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados para alteração de senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!currentUser) {
      setErrorMessage('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage('A nova senha deve ter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      // Reautenticar o usuário
      const credential = EmailAuthProvider.credential(
        currentUser.email || '',
        passwordData.currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Atualizar a senha
      await updatePassword(currentUser, passwordData.newPassword);

      setSuccessMessage('Senha alterada com sucesso!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Senha atual incorreta.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('A nova senha é muito fraca.');
      } else {
        setErrorMessage('Erro ao alterar senha. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      await logout();
    }
  };

  const settingsSections = [
    { id: 'account', label: 'Conta', icon: FaUser },
    { id: 'security', label: 'Segurança', icon: FaLock },
    { id: 'notifications', label: 'Notificações', icon: FaBell },
    { id: 'about', label: 'Sobre', icon: FaInfoCircle }
  ];

  return (
    <div className="settings-container">
      <div className="settings-card">
        <div className="settings-header">
          <h1 className="settings-title">Configurações</h1>
          <p className="settings-subtitle">Gerencie suas preferências e configurações da conta</p>
        </div>

        <div className="settings-content">
          <div className="settings-sidebar">
            {settingsSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="nav-icon"><IconComponent /></span>
                  <span className="nav-label">{section.label}</span>
                </button>
              );
            })}
          </div>

          <div className="settings-main">
            {successMessage && (
              <div className="settings-success-message">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="settings-error-message">{errorMessage}</div>
            )}

            {/* Seção: Conta */}
            {activeSection === 'account' && (
              <div className="settings-section">
                <h2 className="section-title">Informações da Conta</h2>
                <div className="settings-info-group">
                  <div className="info-item">
                    <label className="info-label">Email</label>
                    <p className="info-value">{currentUser?.email || 'Não disponível'}</p>
                  </div>
                  <div className="info-item">
                    <label className="info-label">ID do Usuário</label>
                    <p className="info-value">{currentUser?.uid || 'Não disponível'}</p>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Email Verificado</label>
                    <p className="info-value">
                      {currentUser?.emailVerified ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaCheckCircle style={{ color: '#10b981' }} /> Sim
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaTimesCircle style={{ color: '#ef4444' }} /> Não
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="settings-actions">
                  <button className="logout-button" onClick={handleLogout}>
                    Sair da Conta
                  </button>
                </div>
              </div>
            )}

            {/* Seção: Segurança */}
            {activeSection === 'security' && (
              <div className="settings-section">
                <h2 className="section-title">Alterar Senha</h2>
                <form onSubmit={handlePasswordChange} className="password-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword" className="form-label">
                      Senha Atual <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="form-input"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      placeholder="Digite sua senha atual"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">
                      Nova Senha <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-input"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      placeholder="Digite sua nova senha (mín. 6 caracteres)"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Nova Senha <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-input"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      placeholder="Confirme sua nova senha"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="save-button" disabled={loading}>
                      {loading ? 'Alterando...' : 'Alterar Senha'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Seção: Notificações */}
            {activeSection === 'notifications' && (
              <div className="settings-section">
                <h2 className="section-title">Preferências de Notificação</h2>
                <div className="settings-info-group">
                  <p className="info-text">
                    As configurações de notificação serão implementadas em breve.
                  </p>
                  <div className="notification-item">
                    <div className="notification-info">
                      <label className="notification-label">Notificações por Email</label>
                      <p className="notification-desc">
                        Receba notificações sobre novos editais e atualizações
                      </p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" disabled />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <label className="notification-label">Alertas de Prazo</label>
                      <p className="notification-desc">
                        Receba alertas quando editais estiverem próximos do prazo
                      </p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" disabled />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Seção: Sobre */}
            {activeSection === 'about' && (
              <div className="settings-section">
                <h2 className="section-title">Sobre o Aplicativo</h2>
                <div className="settings-info-group">
                  <div className="about-item">
                    <label className="info-label">Nome do Aplicativo</label>
                    <p className="info-value">Via Arte - Plataforma de Editais</p>
                  </div>
                  <div className="about-item">
                    <label className="info-label">Versão</label>
                    <p className="info-value">1.0.0</p>
                  </div>
                  <div className="about-item">
                    <label className="info-label">Descrição</label>
                    <p className="info-value">
                      Plataforma para busca e acompanhamento de editais de arte, cultura, esporte e projetos sociais.
                    </p>
                  </div>
                  <div className="about-item">
                    <label className="info-label">Desenvolvido por</label>
                    <p className="info-value">Grupo Via Arte</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

