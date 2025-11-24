/**
 * Serviço para gerenciar relatórios de análise de IA
 * Armazena os resultados das análises no Firestore
 */

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  limit
} from "firebase/firestore";
import { db } from "../components/firebase/firebaseConfig";
import { AnalysisResult } from "./geminiService";

export interface AnalysisReport {
  id?: string;
  projectName?: string;
  projectId: string;
  bimImageUrl?: string;
  obraImageUrl?: string;
  contexto?: string;
  resultado: AnalysisResult;
  createdAt: Timestamp;
  createdBy?: string; // Email do usuário
}

/**
 * Salva um relatório de análise no Firestore
 */
export const saveAnalysisReport = async (
  report: Omit<AnalysisReport, 'id' | 'createdAt'>
): Promise<string> => {
  try {
    const reportData = {
      ...report,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "analysisReports"), reportData);
    console.log("✅ Relatório de análise salvo com ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Erro ao salvar relatório:", error);
    throw new Error("Falha ao salvar relatório de análise");
  }
};

/**
 * Busca todos os relatórios de análise
 */
export const getAllAnalysisReports = async (): Promise<AnalysisReport[]> => {
  try {
    const q = query(
      collection(db, "analysisReports"),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const reports: AnalysisReport[] = [];

    querySnapshot.forEach((doc) => {
      reports.push({
        id: doc.id,
        ...doc.data(),
      } as AnalysisReport);
    });

    console.log(`✅ ${reports.length} relatórios de análise carregados`);
    return reports;
  } catch (error) {
    console.error("❌ Erro ao buscar relatórios:", error);
    throw new Error("Falha ao carregar relatórios de análise");
  }
};

/**
 * Busca os últimos N relatórios
 */
export const getRecentAnalysisReports = async (limitCount: number = 10): Promise<AnalysisReport[]> => {
  try {
    const q = query(
      collection(db, "analysisReports"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const reports: AnalysisReport[] = [];

    querySnapshot.forEach((doc) => {
      reports.push({
        id: doc.id,
        ...doc.data(),
      } as AnalysisReport);
    });

    return reports;
  } catch (error) {
    console.error("❌ Erro ao buscar relatórios recentes:", error);
    throw new Error("Falha ao carregar relatórios recentes");
  }
};

/**
 * Deleta um relatório de análise
 */
export const deleteAnalysisReport = async (reportId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "analysisReports", reportId));
    console.log("✅ Relatório deletado:", reportId);
  } catch (error) {
    console.error("❌ Erro ao deletar relatório:", error);
    throw new Error("Falha ao deletar relatório");
  }
};

/**
 * Busca relatórios de um projeto específico
 */
export const getAnalysisReportsByProject = async (projectId: string): Promise<AnalysisReport[]> => {
  try {
    const q = query(
      collection(db, "analysisReports"),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const reports: AnalysisReport[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as AnalysisReport;
      if (data.projectId === projectId) {
        reports.push({
          id: doc.id,
          ...data,
        } as AnalysisReport);
      }
    });

    return reports;
  } catch (error) {
    console.error("❌ Erro ao buscar relatórios do projeto:", error);
    throw new Error("Falha ao carregar relatórios do projeto");
  }
};

