import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { profileService } from '../../services/profileService';
import './UserProfile.css';

const UserProfile = () => {
  const { currentUser, userProfile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: userProfile?.nome || userProfile?.displayName || '',
    genero: userProfile?.genero || '',
    generoOutro: userProfile?.generoOutro || '',
    corRaca: userProfile?.corRaca || '',
    lgbtqia: userProfile?.lgbtqia || '',
    deficiencia: userProfile?.deficiencia || '',
    deficienciaDescricao: userProfile?.deficienciaDescricao || '',
    comunidadeTradicional: userProfile?.comunidadeTradicional || '',
    comunidadeTradicionalOutro: userProfile?.comunidadeTradicionalOutro || '',
    locaisInteresse: userProfile?.locaisInteresse || '',
    observacoes: userProfile?.observacoes || '',
    areasAtuacao: userProfile?.areasAtuacao || [],
    areasAtuacaoOutro: userProfile?.areasAtuacaoOutro || '',
    segmentosCultura: userProfile?.segmentosCultura || [],
    segmentosCulturaOutro: userProfile?.segmentosCulturaOutro || '',
    segmentosEsporte: userProfile?.segmentosEsporte || [],
    segmentosEsporteOutro: userProfile?.segmentosEsporteOutro || '',
    atuacaoSocial: userProfile?.atuacaoSocial || '',
    eixosInteresse: userProfile?.eixosInteresse || [],
    eixosInteresseOutro: userProfile?.eixosInteresseOutro || '',
    historicoProjetos: userProfile?.historicoProjetos || '',
    historicoProjetosOutro: userProfile?.historicoProjetosOutro || '',
    sugestoes: userProfile?.sugestoes || ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (currentUser && userProfile) {
        setFormData({
          nome: userProfile.nome || userProfile.displayName || '',
          genero: userProfile.genero || '',
          generoOutro: userProfile.generoOutro || '',
          corRaca: userProfile.corRaca || '',
          lgbtqia: userProfile.lgbtqia || '',
          deficiencia: userProfile.deficiencia || '',
          deficienciaDescricao: userProfile.deficienciaDescricao || '',
          comunidadeTradicional: userProfile.comunidadeTradicional || '',
          comunidadeTradicionalOutro: userProfile.comunidadeTradicionalOutro || '',
          locaisInteresse: userProfile.locaisInteresse || '',
          observacoes: userProfile.observacoes || '',
          areasAtuacao: userProfile.areasAtuacao || [],
          areasAtuacaoOutro: userProfile.areasAtuacaoOutro || '',
          segmentosCultura: userProfile.segmentosCultura || [],
          segmentosCulturaOutro: userProfile.segmentosCulturaOutro || '',
          segmentosEsporte: userProfile.segmentosEsporte || [],
          segmentosEsporteOutro: userProfile.segmentosEsporteOutro || '',
          atuacaoSocial: userProfile.atuacaoSocial || '',
          eixosInteresse: userProfile.eixosInteresse || [],
          eixosInteresseOutro: userProfile.eixosInteresseOutro || '',
          historicoProjetos: userProfile.historicoProjetos || '',
          historicoProjetosOutro: userProfile.historicoProjetosOutro || '',
          sugestoes: userProfile.sugestoes || ''
        });
      }
    };

    loadProfile();
  }, [currentUser, userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[name as keyof typeof prev] as string[] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [name]: newArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await profileService.updateProfile(currentUser.uid, formData);
      await refreshProfile();
      setSuccessMessage('Perfil salvo com sucesso!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error: any) {
      setErrorMessage('Erro ao salvar perfil. Tente novamente.');
      console.error('Erro ao salvar perfil:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <div className="profile-header">
          <h1 className="profile-title">Perfil do Usuário</h1>
          <p className="profile-subtitle">Complete seu perfil para receber editais personalizados</p>
        </div>

        {successMessage && (
          <div className="profile-success-message">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="profile-error-message">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          {/* 1. Nome */}
          <div className="form-group">
            <label htmlFor="nome" className="form-label">
              Nome <span className="optional">*</span>
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Seu nome completo"
            />
          </div>

          {/* 2. Identidade de gênero */}
          <div className="form-group">
            <label htmlFor="genero" className="form-label">
              Identidade de gênero <span className="optional">*</span>
            </label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Selecione...</option>
              <option value="Homem">Homem</option>
              <option value="Mulher">Mulher</option>
              <option value="Não binário">Não binário</option>
              <option value="Outro">Outro</option>
            </select>
            {formData.genero === 'Outro' && (
              <input
                type="text"
                name="generoOutro"
                value={formData.generoOutro}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Especifique"
                style={{ marginTop: '0.5rem' }}
              />
            )}
          </div>

          {/* 3. Cor ou raça */}
          <div className="form-group">
            <label htmlFor="corRaca" className="form-label">
              Com qual cor ou raça você se identifica? <span className="optional">*</span>
            </label>
            <select
              id="corRaca"
              name="corRaca"
              value={formData.corRaca}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Selecione...</option>
              <option value="Branca">Branca</option>
              <option value="Preta">Preta</option>
              <option value="Parda">Parda</option>
              <option value="Amarela (de origem asiática)">Amarela (de origem asiática)</option>
              <option value="Indígena">Indígena</option>
              <option value="Prefiro não responder">Prefiro não responder</option>
            </select>
          </div>

          {/* 4. LGBTQIAPN+ */}
          <div className="form-group">
            <label htmlFor="lgbtqia" className="form-label">
              Você se identifica como parte da comunidade LGBTQIAPN+? <span className="optional">*</span>
            </label>
            <select
              id="lgbtqia"
              name="lgbtqia"
              value={formData.lgbtqia}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Selecione...</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
              <option value="Prefiro não Responder">Prefiro não Responder</option>
            </select>
          </div>

          {/* 5. Deficiência */}
          <div className="form-group">
            <label htmlFor="deficiencia" className="form-label">
              Você possui alguma deficiência? <span className="optional">*</span>
            </label>
            <select
              id="deficiencia"
              name="deficiencia"
              value={formData.deficiencia}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Selecione...</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
              <option value="Não sei se pode ser considerada">Não sei se pode ser considerada</option>
              <option value="Prefiro não Responder">Prefiro não Responder</option>
            </select>
          </div>

          {/* 6. Descrição da deficiência */}
          {formData.deficiencia === 'Sim' && (
            <div className="form-group">
              <label htmlFor="deficienciaDescricao" className="form-label">
                Qual a sua deficiência?
              </label>
              <textarea
                id="deficienciaDescricao"
                name="deficienciaDescricao"
                value={formData.deficienciaDescricao}
                onChange={handleInputChange}
                className="form-textarea"
                rows={3}
                placeholder="Descreva sua deficiência"
              />
            </div>
          )}

          {/* 7. Comunidade tradicional */}
          <div className="form-group">
            <label htmlFor="comunidadeTradicional" className="form-label">
              Você pertence ou se identifica com algum povo ou comunidade tradicional? <span className="optional">*</span>
            </label>
            <select
              id="comunidadeTradicional"
              name="comunidadeTradicional"
              value={formData.comunidadeTradicional}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Selecione...</option>
              <option value="Nenhum">Nenhum</option>
              <option value="Povos Indígenas">Povos Indígenas</option>
              <option value="Quilombolas">Quilombolas</option>
              <option value="Povos de Terreiro">Povos de Terreiro</option>
              <option value="Ribeirinhos">Ribeirinhos</option>
              <option value="Pescadores Artesanais">Pescadores Artesanais</option>
              <option value="Caiçaras">Caiçaras</option>
              <option value="Prefiro não Responder">Prefiro não Responder</option>
              <option value="Outro">Outro</option>
            </select>
            {formData.comunidadeTradicional === 'Outro' && (
              <input
                type="text"
                name="comunidadeTradicionalOutro"
                value={formData.comunidadeTradicionalOutro}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Especifique"
                style={{ marginTop: '0.5rem' }}
              />
            )}
          </div>

          {/* 8. Locais de Interesse */}
          <div className="form-group">
            <label htmlFor="locaisInteresse" className="form-label">
              Locais de Interesse (Cidades / Estados) <span className="optional">*</span>
            </label>
            <textarea
              id="locaisInteresse"
              name="locaisInteresse"
              value={formData.locaisInteresse}
              onChange={handleInputChange}
              className="form-textarea"
              rows={4}
              placeholder="Liste os municípios e estados onde você possui residência, sede ou tem interesse em receber informações sobre editais"
            />
          </div>

          {/* 9. Observações */}
          <div className="form-group">
            <label htmlFor="observacoes" className="form-label">
              Observações e Detalhes sobre você
            </label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              className="form-textarea"
              rows={4}
              placeholder="Detalhe um pouco mais sobre quaisquer das perguntas anteriores ou outros pontos importantes"
            />
          </div>

          {/* 10. Áreas de Atuação */}
          <div className="form-group">
            <label className="form-label">
              Áreas de Atuação <span className="optional">*</span> (Pode assinalar mais de um)
            </label>
            <div className="checkbox-group">
              {['Cultura', 'Esporte', 'Social'].map(area => (
                <label key={area} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.areasAtuacao.includes(area)}
                    onChange={() => handleCheckboxChange('areasAtuacao', area)}
                    className="checkbox-input"
                  />
                  <span>{area}</span>
                </label>
              ))}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.areasAtuacao.includes('Outro')}
                  onChange={() => handleCheckboxChange('areasAtuacao', 'Outro')}
                  className="checkbox-input"
                />
                <span>Outro:</span>
              </label>
              {formData.areasAtuacao.includes('Outro') && (
                <input
                  type="text"
                  name="areasAtuacaoOutro"
                  value={formData.areasAtuacaoOutro}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Especifique"
                  style={{ marginLeft: '0.5rem', flex: 1 }}
                />
              )}
            </div>
          </div>

          {/* 11. Segmentos de Cultura */}
          {formData.areasAtuacao.includes('Cultura') && (
            <div className="form-group">
              <label className="form-label">
                Na Cultura em Qual(is) segmentos de atuação tem interesse? <span className="optional">*</span>
              </label>
              <div className="checkbox-group">
                {[
                  'Não atuo na cultura',
                  'Artes Visuais',
                  'Audiovisual',
                  'Arte Preta',
                  'Carnaval / Escola de Samba',
                  'Cinema',
                  'Circo',
                  'Contação de Histórias',
                  'Dança',
                  'Design',
                  'Moda',
                  'Cultura Digital',
                  'Espaço Cultural',
                  'Gastronomia',
                  'Literatura',
                  'Museu',
                  'Música',
                  'Organização de Eventos',
                  'Patrimônio Cultural',
                  'Teatro'
                ].map(segmento => (
                  <label key={segmento} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.segmentosCultura.includes(segmento)}
                      onChange={() => handleCheckboxChange('segmentosCultura', segmento)}
                      className="checkbox-input"
                    />
                    <span>{segmento}</span>
                  </label>
                ))}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.segmentosCultura.includes('Outro')}
                    onChange={() => handleCheckboxChange('segmentosCultura', 'Outro')}
                    className="checkbox-input"
                  />
                  <span>Outro:</span>
                </label>
                {formData.segmentosCultura.includes('Outro') && (
                  <input
                    type="text"
                    name="segmentosCulturaOutro"
                    value={formData.segmentosCulturaOutro}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Especifique"
                    style={{ marginLeft: '0.5rem', flex: 1 }}
                  />
                )}
              </div>
            </div>
          )}

          {/* 12. Segmentos de Esporte */}
          {formData.areasAtuacao.includes('Esporte') && (
            <div className="form-group">
              <label className="form-label">
                No Esporte em Qual(is) segmentos de atuação tem interesse? <span className="optional">*</span>
              </label>
              <div className="checkbox-group">
                {[
                  'Não atuo no Esporte',
                  'Educacional',
                  'Formação Esportiva',
                  'Rendimento',
                  'Alto Rendimento',
                  'Sócio Esportivo e Inclusão Social',
                  'Participativa',
                  'Gestão e Desenvolvimento',
                  'Infraestrutura'
                ].map(segmento => (
                  <label key={segmento} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.segmentosEsporte.includes(segmento)}
                      onChange={() => handleCheckboxChange('segmentosEsporte', segmento)}
                      className="checkbox-input"
                    />
                    <span>{segmento}</span>
                  </label>
                ))}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.segmentosEsporte.includes('Outro')}
                    onChange={() => handleCheckboxChange('segmentosEsporte', 'Outro')}
                    className="checkbox-input"
                  />
                  <span>Outro:</span>
                </label>
                {formData.segmentosEsporte.includes('Outro') && (
                  <input
                    type="text"
                    name="segmentosEsporteOutro"
                    value={formData.segmentosEsporteOutro}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Especifique"
                    style={{ marginLeft: '0.5rem', flex: 1 }}
                  />
                )}
              </div>
            </div>
          )}

          {/* 13. Atuação Social */}
          {formData.areasAtuacao.includes('Social') && (
            <div className="form-group">
              <label htmlFor="atuacaoSocial" className="form-label">
                Na área Social explique a atuação ou interesse
              </label>
              <textarea
                id="atuacaoSocial"
                name="atuacaoSocial"
                value={formData.atuacaoSocial}
                onChange={handleInputChange}
                className="form-textarea"
                rows={4}
                placeholder="Descreva sua atuação ou interesse na área social"
              />
            </div>
          )}

          {/* 14. Eixos de Interesse */}
          <div className="form-group">
            <label className="form-label">
              Em quais eixos você possui interesse? <span className="optional">*</span> (Pode responder várias opções)
            </label>
            <div className="checkbox-group">
              {[
                'Eixo de Continuidade',
                'Eixo de Formação',
                'Eixo de Fruição',
                'Eixo de Licenciamento',
                'Eixo de Premiação',
                'Eixo de Produção'
              ].map(eixo => (
                <label key={eixo} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.eixosInteresse.includes(eixo)}
                    onChange={() => handleCheckboxChange('eixosInteresse', eixo)}
                    className="checkbox-input"
                  />
                  <span>{eixo}</span>
                </label>
              ))}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.eixosInteresse.includes('Outro')}
                  onChange={() => handleCheckboxChange('eixosInteresse', 'Outro')}
                  className="checkbox-input"
                />
                <span>Outro:</span>
              </label>
              {formData.eixosInteresse.includes('Outro') && (
                <input
                  type="text"
                  name="eixosInteresseOutro"
                  value={formData.eixosInteresseOutro}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Especifique"
                  style={{ marginLeft: '0.5rem', flex: 1 }}
                />
              )}
            </div>
          </div>

          {/* 15. Histórico de Projetos */}
          <div className="form-group">
            <label htmlFor="historicoProjetos" className="form-label">
              Histórico de Projetos <span className="optional">*</span>
            </label>
            <select
              id="historicoProjetos"
              name="historicoProjetos"
              value={formData.historicoProjetos}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Selecione...</option>
              <option value="Nunca realizei projetos">Nunca realizei projetos</option>
              <option value="Já tive projetos contemplados até R$ 50 mil">Já tive projetos contemplados até R$ 50 mil</option>
              <option value="Já realizei projetos entre R$ 50 mil e R$ 500 mil">Já realizei projetos entre R$ 50 mil e R$ 500 mil</option>
              <option value="Já tive projetos acima de R$ 500 mil aprovados">Já tive projetos acima de R$ 500 mil aprovados</option>
              <option value="Já tive diversos projetos contemplados de vários valores diferentes">Já tive diversos projetos contemplados de vários valores diferentes</option>
              <option value="Outro">Outro</option>
            </select>
            {formData.historicoProjetos === 'Outro' && (
              <input
                type="text"
                name="historicoProjetosOutro"
                value={formData.historicoProjetosOutro}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Especifique"
                style={{ marginTop: '0.5rem' }}
              />
            )}
          </div>

          {/* 16. Sugestões */}
          <div className="form-group">
            <label htmlFor="sugestoes" className="form-label">
              Sugestões e Soluções <span className="optional">*</span>
            </label>
            <textarea
              id="sugestoes"
              name="sugestoes"
              value={formData.sugestoes}
              onChange={handleInputChange}
              className="form-textarea"
              rows={4}
              placeholder="Você tem alguma sugestão, ideia ou solução que gostaria de compartilhar com o Grupo Via Arte?"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
