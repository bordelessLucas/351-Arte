import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FaExclamationTriangle } from 'react-icons/fa';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Verifica se as variáveis de ambiente estão configuradas
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('Firebase não configurado. Configure as variáveis de ambiente no arquivo .env');
}

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
  // Cria uma configuração dummy para evitar quebra da aplicação
  app = initializeApp({
    apiKey: 'dummy',
    authDomain: 'dummy.firebaseapp.com',
    projectId: 'dummy',
    storageBucket: 'dummy.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:dummy'
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

