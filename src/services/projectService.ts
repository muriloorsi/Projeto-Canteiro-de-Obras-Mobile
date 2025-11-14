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
import { db } from "../components/firebase/firebaseConfig";

export interface ProjectStep {
  name: string;
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
}

export interface Project {
  id?: string;
  name: string;
  line: string;
  station?: string;
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
  status: string;
  steps: ProjectStep[];
  images?: string[];
  createdAt?: Date | Timestamp;
}

/**
 * Lista todos os projetos
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data()
      } as Project);
    });

    return projects;
  } catch (error) {
    console.error("Erro ao listar projetos:", error);
    throw new Error("Erro ao listar projetos");
  }
};

/**
 * Busca um projeto por ID
 */
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Project;
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    throw new Error("Erro ao buscar projeto");
  }
};

/**
 * Cria um novo projeto
 */
export const createProject = async (project: Omit<Project, "id" | "createdAt">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: Timestamp.now()
    });

    return docRef.id;
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    throw new Error("Erro ao criar projeto");
  }
};

/**
 * Atualiza um projeto existente
 */
export const updateProject = async (id: string, project: Partial<Project>): Promise<void> => {
  try {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, project as any);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw new Error("Erro ao atualizar projeto");
  }
};

/**
 * Deleta um projeto
 */
export const deleteProject = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw new Error("Erro ao deletar projeto");
  }
};

/**
 * Busca projetos por status
 */
export const getProjectsByStatus = async (status: string): Promise<Project[]> => {
  try {
    const q = query(collection(db, "projects"), where("status", "==", status));
    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data()
      } as Project);
    });

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos por status:", error);
    throw new Error("Erro ao buscar projetos por status");
  }
};

export function calcularProgressoProjeto(projeto: any) {
  if (!projeto.startDate || !projeto.endDate) return 0;

  // Converte qualquer formato de data
  const parseDate = (dateValue: any): Date => {
    if (!dateValue) return new Date();

    if (dateValue instanceof Date) {
      return dateValue;
    }

    if (typeof dateValue === "object" && "seconds" in dateValue) {
      return new Date(dateValue.seconds * 1000);
    }

    if (typeof dateValue === "string") {
      return new Date(dateValue + "T00:00:00");
    }

    return new Date();
  };

  const start = parseDate(projeto.startDate);
  const end = parseDate(projeto.endDate);
  const now = new Date();

  if (now < start) return 0;

  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  const percent = Math.min(Math.max((elapsed / total) * 100, 0), 100);

  return Math.round(percent);
}
