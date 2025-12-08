import { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaClipboardList } from 'react-icons/fa';
import './Home.css';

interface Edital {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  tipo: string;
  status: string;
  dataInicio: string;
  dataFim: string;
}

const editaisMock: Edital[] = [
  // Artes Visuais
  {
    id: '1',
    nome: 'Prêmio Nacional de Arte Contemporânea',
    descricao: 'Concurso para artistas contemporâneos com obras inovadoras. Premiação de R$ 50.000,00.',
    foto: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    categoria: 'Contemporânea',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-01-15',
    dataFim: '2024-06-30'
  },
  {
    id: '2',
    nome: 'Exposição Internacional de Pintura',
    descricao: 'Chamada para exposição coletiva de pinturas em galeria internacional. Seleção de 20 artistas.',
    foto: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    categoria: 'Pintura',
    tipo: 'Exposição',
    status: 'Aberto',
    dataInicio: '2024-02-01',
    dataFim: '2024-05-15'
  },
  {
    id: '5',
    nome: 'Bienal de Escultura Moderna',
    descricao: 'Concurso de esculturas para a bienal internacional. Premiação total de R$ 100.000,00.',
    foto: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&h=600&fit=crop',
    categoria: 'Escultura',
    tipo: 'Bienal',
    status: 'Aberto',
    dataInicio: '2024-01-20',
    dataFim: '2024-07-15'
  },
  {
    id: '7',
    nome: 'Mostra de Arte Urbana',
    descricao: 'Edital para artistas de rua e grafite. Intervenções em espaços públicos da cidade.',
    foto: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    categoria: 'Urbana',
    tipo: 'Mostra',
    status: 'Encerrado',
    dataInicio: '2023-10-01',
    dataFim: '2023-12-31'
  },
  {
    id: '8',
    nome: 'Prêmio de Arte Têxtil',
    descricao: 'Concurso para obras de arte têxtil, bordados e instalações com tecidos.',
    foto: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=600&fit=crop',
    categoria: 'Têxtil',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-03-15',
    dataFim: '2024-08-30'
  },
  // Audiovisual
  {
    id: '6',
    nome: 'Prêmio de Fotografia Artística',
    descricao: 'Concurso de fotografia artística com tema livre. Exposição das obras selecionadas.',
    foto: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
    categoria: 'Fotografia',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-02-15',
    dataFim: '2024-06-30'
  },
  // Cultura Digital
  {
    id: '3',
    nome: 'Festival de Arte Digital',
    descricao: 'Edital para obras de arte digital, videoarte e instalações interativas. Inscrições até maio.',
    foto: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    categoria: 'Digital',
    tipo: 'Festival',
    status: 'Aberto',
    dataInicio: '2024-03-01',
    dataFim: '2024-05-31'
  },
  // Arte Preta
  {
    id: '9',
    nome: 'Prêmio de Arte Preta Contemporânea',
    descricao: 'Concurso exclusivo para artistas negros com foco em arte contemporânea. Premiação de R$ 75.000,00.',
    foto: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    categoria: 'Arte Preta',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-04-01',
    dataFim: '2024-08-31'
  },
  // Carnaval / Escola de Samba
  {
    id: '10',
    nome: 'Festival de Carnaval e Escolas de Samba',
    descricao: 'Edital para projetos de carnaval, escolas de samba e manifestações culturais populares.',
    foto: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    categoria: 'Carnaval',
    tipo: 'Festival',
    status: 'Aberto',
    dataInicio: '2024-05-01',
    dataFim: '2024-09-30'
  },
  // Cinema
  {
    id: '11',
    nome: 'Prêmio Nacional de Cinema Independente',
    descricao: 'Concurso para produções cinematográficas independentes. Premiação de R$ 200.000,00.',
    foto: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    categoria: 'Cinema',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-03-01',
    dataFim: '2024-07-31'
  },
  // Circo
  {
    id: '12',
    nome: 'Mostra Nacional de Artes Circenses',
    descricao: 'Edital para grupos e artistas circenses. Apresentações em espaços públicos e privados.',
    foto: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    categoria: 'Circo',
    tipo: 'Mostra',
    status: 'Aberto',
    dataInicio: '2024-04-15',
    dataFim: '2024-08-15'
  },
  // Contação de Histórias
  {
    id: '13',
    nome: 'Festival de Contação de Histórias',
    descricao: 'Edital para contadores de histórias e narradores. Apresentações em bibliotecas e espaços culturais.',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    categoria: 'Contação',
    tipo: 'Festival',
    status: 'Aberto',
    dataInicio: '2024-05-01',
    dataFim: '2024-09-30'
  },
  // Dança
  {
    id: '14',
    nome: 'Bienal de Dança Contemporânea',
    descricao: 'Concurso para coreógrafos e grupos de dança contemporânea. Premiação de R$ 80.000,00.',
    foto: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
    categoria: 'Dança',
    tipo: 'Bienal',
    status: 'Aberto',
    dataInicio: '2024-06-01',
    dataFim: '2024-10-31'
  },
  // Design
  {
    id: '15',
    nome: 'Prêmio Nacional de Design',
    descricao: 'Concurso para designers em todas as áreas. Premiação de R$ 60.000,00.',
    foto: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    categoria: 'Design',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-03-15',
    dataFim: '2024-07-31'
  },
  // Moda
  {
    id: '16',
    nome: 'Festival de Moda Sustentável',
    descricao: 'Edital para estilistas e marcas de moda sustentável. Desfile e premiação.',
    foto: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    categoria: 'Moda',
    tipo: 'Festival',
    status: 'Em breve',
    dataInicio: '2024-08-01',
    dataFim: '2024-11-30'
  },
  // Espaço Cultural
  {
    id: '17',
    nome: 'Programa de Apoio a Espaços Culturais',
    descricao: 'Edital para manutenção e programação de espaços culturais independentes.',
    foto: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    categoria: 'Espaço Cultural',
    tipo: 'Continuidade',
    status: 'Aberto',
    dataInicio: '2024-04-01',
    dataFim: '2024-08-31'
  },
  // Gastronomia
  {
    id: '18',
    nome: 'Festival de Gastronomia Cultural',
    descricao: 'Edital para chefs e projetos gastronômicos com foco em cultura e tradição.',
    foto: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
    categoria: 'Gastronomia',
    tipo: 'Festival',
    status: 'Aberto',
    dataInicio: '2024-05-15',
    dataFim: '2024-09-30'
  },
  // Literatura
  {
    id: '19',
    nome: 'Prêmio Nacional de Literatura',
    descricao: 'Concurso para escritores em diversas categorias. Premiação de R$ 90.000,00.',
    foto: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
    categoria: 'Literatura',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-04-01',
    dataFim: '2024-08-31'
  },
  // Museu
  {
    id: '20',
    nome: 'Programa de Exposições em Museus',
    descricao: 'Edital para curadores e artistas para exposições em museus parceiros.',
    foto: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    categoria: 'Museu',
    tipo: 'Exposição',
    status: 'Aberto',
    dataInicio: '2024-06-01',
    dataFim: '2024-10-31'
  },
  // Música
  {
    id: '21',
    nome: 'Festival Nacional de Música',
    descricao: 'Edital para músicos e bandas independentes. Shows e gravação de álbum.',
    foto: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    categoria: 'Música',
    tipo: 'Festival',
    status: 'Aberto',
    dataInicio: '2024-05-01',
    dataFim: '2024-09-30'
  },
  // Organização de Eventos
  {
    id: '22',
    nome: 'Prêmio de Organização de Eventos Culturais',
    descricao: 'Concurso para produtores e organizadores de eventos culturais. Premiação de R$ 70.000,00.',
    foto: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    categoria: 'Eventos',
    tipo: 'Concurso',
    status: 'Aberto',
    dataInicio: '2024-04-15',
    dataFim: '2024-08-31'
  },
  // Patrimônio Cultural
  {
    id: '23',
    nome: 'Programa de Preservação do Patrimônio Cultural',
    descricao: 'Edital para projetos de preservação e valorização do patrimônio cultural material e imaterial.',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    categoria: 'Patrimônio',
    tipo: 'Continuidade',
    status: 'Aberto',
    dataInicio: '2024-06-01',
    dataFim: '2024-10-31'
  },
  // Teatro
  {
    id: '24',
    nome: 'Mostra Nacional de Teatro',
    descricao: 'Edital para grupos teatrais e dramaturgos. Apresentações em diversos espaços.',
    foto: 'https://images.unsplash.com/photo-1503095391549-8c8e318e085e?w=800&h=600&fit=crop',
    categoria: 'Teatro',
    tipo: 'Mostra',
    status: 'Aberto',
    dataInicio: '2024-05-15',
    dataFim: '2024-09-30'
  },
  // Eixo de Formação - Cursos e Workshops
  {
    id: '4',
    nome: 'Residência Artística em Paris',
    descricao: 'Programa de residência artística de 3 meses em Paris. Inclui ateliê e mentoria.',
    foto: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    categoria: 'Residência',
    tipo: 'Residência',
    status: 'Em breve',
    dataInicio: '2024-07-01',
    dataFim: '2024-08-31'
  },
  {
    id: '25',
    nome: 'Curso Avançado de Artes Visuais',
    descricao: 'Curso intensivo de 6 meses para artistas visuais. Inclui materiais e certificado.',
    foto: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    categoria: 'Pintura',
    tipo: 'Curso',
    status: 'Aberto',
    dataInicio: '2024-06-01',
    dataFim: '2024-11-30'
  },
  {
    id: '26',
    nome: 'Workshop de Cinema Documental',
    descricao: 'Workshop intensivo de 2 semanas sobre produção de cinema documental.',
    foto: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    categoria: 'Cinema',
    tipo: 'Workshop',
    status: 'Aberto',
    dataInicio: '2024-07-15',
    dataFim: '2024-07-30'
  },
  // Eixo de Licenciamento
  {
    id: '27',
    nome: 'Programa de Licenciamento de Obras Culturais',
    descricao: 'Edital para licenciamento de obras culturais para uso em produções audiovisuais.',
    foto: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    categoria: 'Audiovisual',
    tipo: 'Licenciamento',
    status: 'Aberto',
    dataInicio: '2024-05-01',
    dataFim: '2024-09-30'
  },
  // Eixo de Continuidade
  {
    id: '28',
    nome: 'Programa de Continuidade para Artistas',
    descricao: 'Edital para dar continuidade a projetos artísticos já iniciados. Apoio de R$ 40.000,00.',
    foto: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    categoria: 'Contemporânea',
    tipo: 'Continuidade',
    status: 'Aberto',
    dataInicio: '2024-06-01',
    dataFim: '2024-10-31'
  }
];

const Home = () => {
  const { userProfile, currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mapeamento de categorias dos editais para segmentos de cultura
  const categoriaToSegmento: Record<string, string[]> = {
    'Contemporânea': ['Artes Visuais'],
    'Pintura': ['Artes Visuais'],
    'Digital': ['Cultura Digital'],
    'Escultura': ['Artes Visuais'],
    'Fotografia': ['Audiovisual'],
    'Audiovisual': ['Audiovisual'],
    'Urbana': ['Artes Visuais'],
    'Têxtil': ['Artes Visuais'],
    'Residência': ['Artes Visuais'],
    'Arte Preta': ['Arte Preta'],
    'Carnaval': ['Carnaval / Escola de Samba'],
    'Cinema': ['Cinema'],
    'Circo': ['Circo'],
    'Contação': ['Contação de Histórias'],
    'Dança': ['Dança'],
    'Design': ['Design'],
    'Moda': ['Moda'],
    'Espaço Cultural': ['Espaço Cultural'],
    'Gastronomia': ['Gastronomia'],
    'Literatura': ['Literatura'],
    'Museu': ['Museu'],
    'Música': ['Música'],
    'Eventos': ['Organização de Eventos'],
    'Patrimônio': ['Patrimônio Cultural'],
    'Teatro': ['Teatro']
  };

  // Mapeamento de tipos de edital para eixos de interesse
  const tipoToEixo: Record<string, string[]> = {
    'Concurso': ['Eixo de Premiação', 'Eixo de Produção'],
    'Exposição': ['Eixo de Fruição', 'Eixo de Produção'],
    'Festival': ['Eixo de Fruição', 'Eixo de Produção'],
    'Residência': ['Eixo de Formação', 'Eixo de Produção'],
    'Bienal': ['Eixo de Fruição', 'Eixo de Produção'],
    'Mostra': ['Eixo de Fruição', 'Eixo de Produção'],
    'Curso': ['Eixo de Formação'],
    'Workshop': ['Eixo de Formação'],
    'Licenciamento': ['Eixo de Licenciamento'],
    'Continuidade': ['Eixo de Continuidade']
  };

  const editaisFiltrados = useMemo(() => {
    return editaisMock.filter(edital => {
      // Filtro de busca por texto
      const matchSearch = searchTerm === '' || 
        edital.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edital.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchSearch) return false;

      // Se não há perfil, mostrar todos os editais (após filtro de busca)
      if (!userProfile) return true;

      // Filtros baseados no questionário do perfil
      let matchProfile = true;

      // 1. Filtrar por áreas de atuação e segmentos de cultura
      if (userProfile.areasAtuacao && userProfile.areasAtuacao.length > 0) {
        const areasAtuacao = userProfile.areasAtuacao;
        const segmentosEdital = categoriaToSegmento[edital.categoria] || [];
        const isEditalCultura = segmentosEdital.length > 0;
        
        // Se o edital é de cultura
        if (isEditalCultura) {
          // Verificar se o usuário tem interesse em Cultura
          if (areasAtuacao.includes('Cultura')) {
            // Se tem interesse em Cultura, verificar segmentos específicos
            if (userProfile.segmentosCultura && userProfile.segmentosCultura.length > 0) {
              const segmentosCultura = userProfile.segmentosCultura;
              // Ignorar "Não atuo na cultura" e "Outro" se houver outros segmentos
              const segmentosValidos = segmentosCultura.filter(
                seg => seg !== 'Não atuo na cultura' && seg !== 'Outro'
              );
              
              if (segmentosValidos.length > 0) {
                // Filtrar por segmentos específicos
                matchProfile = segmentosEdital.some(seg => segmentosValidos.includes(seg));
              } else if (segmentosCultura.includes('Não atuo na cultura')) {
                // Se só tem "Não atuo na cultura", não mostrar editais de cultura
                matchProfile = false;
              }
              // Se só tem "Outro" ou está vazio, mostrar todos os editais de cultura
            }
            // Se não tem segmentos selecionados mas tem Cultura, mostrar todos
          } else {
            // Se não tem interesse em Cultura, não mostrar editais de cultura
            matchProfile = false;
          }
        }
        // Se o edital não é de cultura (futuro: esporte, social), manter matchProfile = true
      }

      // 2. Filtrar por eixos de interesse
      if (matchProfile && userProfile.eixosInteresse && userProfile.eixosInteresse.length > 0) {
        const eixosInteresse = userProfile.eixosInteresse.filter(eixo => eixo !== 'Outro');
        if (eixosInteresse.length > 0) {
          const eixosEdital = tipoToEixo[edital.tipo] || [];
          // Se o edital tem eixos mapeados, verificar se há correspondência
          if (eixosEdital.length > 0) {
            matchProfile = eixosEdital.some(eixo => eixosInteresse.includes(eixo));
          }
          // Se o edital não tem eixos mapeados, manter matchProfile = true (não filtrar)
        }
      }

      return matchProfile;
    });
  }, [searchTerm, userProfile]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Feed de Editais de Arte</h1>
        <p className="home-subtitle">
          Olá, {userProfile?.displayName || currentUser?.email || 'Usuário'}! Explore suas oportunidades artísticas.
        </p>
      </div>

      <div className="search-filters-section">
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar editais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {userProfile && (
          <div className="profile-filters-info">
            <p className="profile-filters-text">
              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                <FaClipboardList />
              </span>
              Os editais estão sendo filtrados automaticamente com base no seu perfil:
              {userProfile.areasAtuacao && userProfile.areasAtuacao.length > 0 && (
                <span> {userProfile.areasAtuacao.join(', ')}</span>
              )}
              {userProfile.segmentosCultura && userProfile.segmentosCultura.length > 0 && 
               userProfile.areasAtuacao?.includes('Cultura') && (
                <span> • {userProfile.segmentosCultura.filter(s => s !== 'Não atuo na cultura' && s !== 'Outro').join(', ')}</span>
              )}
              {userProfile.eixosInteresse && userProfile.eixosInteresse.length > 0 && (
                <span> • {userProfile.eixosInteresse.filter(e => e !== 'Outro').join(', ')}</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="editais-grid">
        {editaisFiltrados.length > 0 ? (
          editaisFiltrados.map((edital, index) => (
            <div key={edital.id} className="edital-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="edital-image-container">
                <img src={edital.foto} alt={edital.nome} className="edital-image" />
                <div className={`edital-status-badge status-${edital.status.toLowerCase().replace(' ', '-')}`}>
                  {edital.status}
                </div>
              </div>
              <div className="edital-content">
                <h3 className="edital-nome">{edital.nome}</h3>
                <p className="edital-descricao">{edital.descricao}</p>
                <div className="edital-meta">
                  <span className="edital-categoria">{edital.categoria}</span>
                  <span className="edital-tipo">{edital.tipo}</span>
                </div>
                <div className="edital-dates">
                  <span>Início: {new Date(edital.dataInicio).toLocaleDateString('pt-BR')}</span>
                  <span>Fim: {new Date(edital.dataFim).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhum edital encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

