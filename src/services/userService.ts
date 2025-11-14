import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase/firebaseConfig";

export interface User {
  id?: string;
  name: string;
  email: string;
  permission?: string;
  createdAt?: Date | Timestamp;
}

/**
 * Lista todos os usuários
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users: User[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        permission: data.permission,
        createdAt: data.createdAt
      });
    });

    return users;
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    throw new Error("Erro ao listar usuários");
  }
};

/**
 * Busca um usuário por ID
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        email: data.email,
        permission: data.permission,
        createdAt: data.createdAt
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Erro ao buscar usuário");
  }
};

/**
 * Cria um novo usuário
 * NOTA: Isso cria tanto no Firebase Auth quanto no Firestore
 */
export const createUser = async (
  name: string,
  email: string,
  password: string,
  permission: string = "user"
): Promise<string> => {
  try {
    // Cria usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Cria documento do usuário no Firestore usando o mesmo ID
    await addDoc(collection(db, "users"), {
      name,
      email,
      permission,
      createdAt: Timestamp.now()
    });

    return userId;
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Email já está em uso");
    } else if (error.code === "auth/weak-password") {
      throw new Error("Senha muito fraca. Use pelo menos 6 caracteres");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Email inválido");
    }
    
    throw new Error("Erro ao criar usuário");
  }
};

/**
 * Atualiza um usuário existente
 */
export const updateUser = async (id: string, user: Partial<User>): Promise<void> => {
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, user as any);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Erro ao atualizar usuário");
  }
};

/**
 * Deleta um usuário
 */
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw new Error("Erro ao deletar usuário");
  }
};

/**
 * Busca usuário por email
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        permission: data.permission,
        createdAt: data.createdAt
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw new Error("Erro ao buscar usuário por email");
  }
};

