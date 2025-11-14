import { 
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase/firebaseConfig";

export interface UserData {
  id: string;
  email: string;
  name: string;
  permission: string;
}

/**
 * Faz login do usuário com email e senha
 * Busca dados adicionais do usuário no Firestore
 */
export const loginUser = async (email: string, password: string): Promise<UserData> => {
  try {
    // Autentica no Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Busca dados adicionais do usuário no Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      throw new Error("Dados do usuário não encontrados");
    }

    const userData = userDoc.data();

    const result: UserData = {
      id: user.uid,
      email: user.email || email,
      name: userData.name || "",
      permission: userData.permission || "user"
    };

    return result;
  } catch (error: any) {
    console.error("Erro no login:", error);
    
    // Mensagens de erro mais amigáveis
    if (error.code === "auth/user-not-found") {
      throw new Error("Usuário não encontrado");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Senha incorreta");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Email inválido");
    } else if (error.code === "auth/too-many-requests") {
      throw new Error("Muitas tentativas. Tente novamente mais tarde");
    }
    
    throw new Error(error.message || "Erro ao fazer login");
  }
};

/**
 * Faz logout do usuário
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("permissaoUsuario");
    localStorage.removeItem("emailUsuario");
  } catch (error: any) {
    console.error("Erro no logout:", error);
    throw new Error("Erro ao fazer logout");
  }
};

/**
 * Retorna o usuário atualmente autenticado
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Verifica se há um usuário autenticado
 */
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};

