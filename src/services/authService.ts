import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  // Campos do formulário de perfil
  nome?: string;
  genero?: string;
  generoOutro?: string;
  corRaca?: string;
  lgbtqia?: string;
  deficiencia?: string;
  deficienciaDescricao?: string;
  comunidadeTradicional?: string;
  comunidadeTradicionalOutro?: string;
  locaisInteresse?: string;
  observacoes?: string;
  areasAtuacao?: string[];
  areasAtuacaoOutro?: string;
  segmentosCultura?: string[];
  segmentosCulturaOutro?: string;
  segmentosEsporte?: string[];
  segmentosEsporteOutro?: string;
  atuacaoSocial?: string;
  eixosInteresse?: string[];
  eixosInteresseOutro?: string;
  historicoProjetos?: string;
  historicoProjetosOutro?: string;
  sugestoes?: string;
}

export const authService = {
  async register(email: string, password: string, displayName: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Atualizar o perfil do usuário
    await updateProfile(userCredential.user, {
      displayName: displayName
    });

    // Criar perfil do usuário no Firestore
    const userProfile: UserProfile = {
      uid: userCredential.user.uid,
      email: userCredential.user.email || email,
      displayName: displayName,
      createdAt: new Date()
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);

    return userCredential;
  },

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async logout(): Promise<void> {
    return await signOut(auth);
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  }
};

