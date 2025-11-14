/**
 * Serviço de Análise de Obras com Google Gemini Vision
 * 
 * Este serviço permite comparar uma foto do modelo BIM com uma foto real da obra,
 * usando a API Gemini Vision do Google para análise de conformidade.
 * 
 * Projeto: Sistema de Gerenciamento de Canteiro de Obras - Metrô SP
 */

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export interface AnalysisResult {
  percentual_conformidade: number;
  status_obra: string;
  resumo_executivo: string;
  aspectos_conformes: string[];
  divergencias_encontradas: {
    tipo: string;
    descricao: string;
    criticidade: 'baixa' | 'media' | 'alta' | 'critica';
    impacto_cronograma: string;
  }[];
  recomendacoes_imediatas: string[];
  observacoes_seguranca: string[];
  proximos_passos: string[];
}

/**
 * Redimensiona e comprime uma imagem antes de converter para Base64
 */
async function resizeAndCompressImage(file: File, maxWidth: number = 1920, maxHeight: number = 1080, quality: number = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calcular novo tamanho mantendo proporção
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Falha ao comprimir imagem'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Converte File para Base64
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Detecta o tipo MIME da imagem
 */
function getImageMimeType(file: File): string {
  const mimeTypes: { [key: string]: string } = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
  };
  
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  return mimeTypes[extension] || 'image/jpeg';
}

/**
 * Analisa conformidade entre modelo BIM e foto da obra
 * 
 * @param bimImage - Arquivo da imagem do modelo BIM
 * @param obraImage - Arquivo da foto atual da obra
 * @param contexto - Informações adicionais sobre o projeto (opcional)
 */
export async function analisarConformidadeObra(
  bimImage: File,
  obraImage: File,
  contexto?: string
): Promise<{ success: boolean; data?: AnalysisResult; error?: string }> {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('Chave da API Gemini não configurada. Configure REACT_APP_GEMINI_API_KEY');
    }

    console.log('🔍 Iniciando análise de conformidade da obra...');
    
    // Validar arquivos
    if (!bimImage || !obraImage) {
      throw new Error('Imagens inválidas. Certifique-se de fazer upload de ambas as imagens.');
    }

    console.log('📷 Imagem BIM:', bimImage.name, '/', bimImage.type, '/', (bimImage.size / 1024).toFixed(2), 'KB');
    console.log('📷 Imagem Obra:', obraImage.name, '/', obraImage.type, '/', (obraImage.size / 1024).toFixed(2), 'KB');

    // Comprimir imagens se forem muito grandes (> 1MB)
    let bimFileToProcess: File | Blob = bimImage;
    let obraFileToProcess: File | Blob = obraImage;

    if (bimImage.size > 1024 * 1024) { // > 1MB
      console.log('🔧 Comprimindo imagem BIM (muito grande)...');
      bimFileToProcess = await resizeAndCompressImage(bimImage, 1920, 1080, 0.85);
      console.log('✅ Imagem BIM comprimida:', (bimFileToProcess.size / 1024).toFixed(2), 'KB');
    }

    if (obraImage.size > 1024 * 1024) { // > 1MB
      console.log('🔧 Comprimindo imagem Obra (muito grande)...');
      obraFileToProcess = await resizeAndCompressImage(obraImage, 1920, 1080, 0.85);
      console.log('✅ Imagem Obra comprimida:', (obraFileToProcess.size / 1024).toFixed(2), 'KB');
    }

    // Converter imagens para Base64
    console.log('🔄 Convertendo imagens para Base64...');
    const [bimBase64, obraBase64] = await Promise.all([
      fileToBase64(bimFileToProcess instanceof File ? bimFileToProcess : new File([bimFileToProcess], 'compressed.jpg', { type: 'image/jpeg' })),
      fileToBase64(obraFileToProcess instanceof File ? obraFileToProcess : new File([obraFileToProcess], 'compressed.jpg', { type: 'image/jpeg' }))
    ]);
    
    if (!bimBase64 || !obraBase64) {
      throw new Error('Falha ao converter imagens para Base64');
    }
    
    console.log('✅ Imagens convertidas com sucesso');
    console.log('📊 Base64 BIM length:', bimBase64.length);
    console.log('📊 Base64 Obra length:', obraBase64.length);

    // Se comprimimos, sempre será JPEG
    const bimMimeType = bimFileToProcess instanceof Blob && !(bimFileToProcess instanceof File) ? 'image/jpeg' : getImageMimeType(bimImage);
    const obraMimeType = obraFileToProcess instanceof Blob && !(obraFileToProcess instanceof File) ? 'image/jpeg' : getImageMimeType(obraImage);
    
    console.log('🎨 MIME Type BIM:', bimMimeType);
    console.log('🎨 MIME Type Obra:', obraMimeType);

    // Contexto adicional do usuário
    const contextoSecao = contexto 
      ? `\n\nINFORMAÇÕES DO PROJETO:\n${contexto}\n`
      : '';

    // Prompt especializado para análise de canteiro de obras
    const prompt = `Você é um INSPETOR TÉCNICO especializado em fiscalização de obras do Metrô de São Paulo, com experiência em comparação de projetos executados versus planejados.

IMAGENS FORNECIDAS:
- IMAGEM 1: Modelo BIM / Projeto Executivo (referência planejada)
- IMAGEM 2: Fotografia atual do canteiro de obras (execução real)${contextoSecao}

SUA MISSÃO:
Realizar uma INSPEÇÃO TÉCNICA DETALHADA comparando o que foi planejado (BIM) com o que está sendo executado (foto da obra), avaliando conformidade, segurança e aderência ao cronograma.

CRITÉRIOS DE AVALIAÇÃO:

1. CONFORMIDADE ESTRUTURAL
   - Elementos estruturais (pilares, vigas, lajes, fundações)
   - Dimensões e posicionamento
   - Alinhamento e nivelamento

2. EXECUÇÃO DE SISTEMAS
   - Instalações elétricas
   - Instalações hidráulicas
   - Sistemas de drenagem
   - Ventilação e climatização

3. ACABAMENTOS E REVESTIMENTOS
   - Qualidade dos materiais
   - Padrão de acabamento
   - Cores e texturas

4. SEGURANÇA DO TRABALHO
   - EPIs visíveis
   - Sinalização de segurança
   - Organização do canteiro
   - Proteções coletivas

5. PERCENTUAL DE CONFORMIDADE
   - 90-100%: Execução excelente, alinhada ao BIM
   - 70-89%: Boa execução, pequenos ajustes necessários
   - 50-69%: Execução aceitável, requer correções
   - 30-49%: Execução deficiente, correções urgentes
   - 0-29%: Não conforme, retrabalho necessário

FORMATO DA RESPOSTA (APENAS JSON):

{
  "percentual_conformidade": <número de 0 a 100>,
  "status_obra": "<em dia|atrasada|adiantada>",
  "resumo_executivo": "<resumo técnico em até 200 caracteres>",
  "aspectos_conformes": [
    "<aspecto 1 que está de acordo com o BIM>",
    "<aspecto 2 que está de acordo com o BIM>",
    "<aspecto 3 que está de acordo com o BIM>"
  ],
  "divergencias_encontradas": [
    {
      "tipo": "<estrutural|instalacoes|acabamento|seguranca|posicionamento>",
      "descricao": "<descrição clara e objetiva em até 100 caracteres>",
      "criticidade": "<baixa|media|alta|critica>",
      "impacto_cronograma": "<em até 80 caracteres>"
    }
  ],
  "recomendacoes_imediatas": [
    "<ação 1 prioritária em até 100 caracteres>",
    "<ação 2 prioritária em até 100 caracteres>"
  ],
  "observacoes_seguranca": [
    "<observação 1 sobre segurança do trabalho>",
    "<observação 2 sobre segurança do trabalho>"
  ],
  "proximos_passos": [
    "<próximo passo 1 para avançar a obra>",
    "<próximo passo 2 para avançar a obra>"
  ]
}

REGRAS IMPORTANTES:
✅ Seja OBJETIVO e TÉCNICO
✅ Use terminologia de engenharia civil
✅ Priorize SEGURANÇA sempre
✅ Máximo 3 itens em cada array
✅ Respeite os limites de caracteres
✅ Retorne APENAS o JSON (sem markdown, sem explicações extras)

❌ NÃO seja vago ou genérico
❌ NÃO ignore problemas de segurança
❌ NÃO ultrapasse os limites de caracteres
❌ NÃO adicione texto antes ou depois do JSON`;

    // Payload para a API do Gemini
    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: bimMimeType,
                data: bimBase64
              }
            },
            {
              inline_data: {
                mime_type: obraMimeType,
                data: obraBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192, // Aumentado para suportar respostas mais longas
        responseMimeType: "application/json"
      }
    };

    // Requisição para a API
    console.log('🚀 Enviando requisição para API Gemini...');
    console.log('📍 URL:', `${GEMINI_API_URL}?key=${GEMINI_API_KEY.substring(0, 10)}...`);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('📡 Status da resposta:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Erro da API Gemini:', errorData);
      throw new Error(`Erro na API do Gemini: ${errorData.error?.message || 'Erro desconhecido'}`);
    }

    const data = await response.json();
    
    // Log para debug (pode remover depois)
    console.log('Resposta da API Gemini:', JSON.stringify(data, null, 2));
    
    // Validação da resposta
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Nenhuma resposta gerada pela IA');
    }

    // Validação mais robusta da estrutura da resposta
    const candidate = data.candidates[0];
    
    // Verificar se a resposta foi cortada por limite de tokens
    if (candidate.finishReason === 'MAX_TOKENS') {
      console.warn('⚠️ Resposta cortada por limite de tokens');
      throw new Error('A análise foi interrompida por ser muito longa. Tente com imagens menores ou menos detalhes.');
    }
    
    if (!candidate.content) {
      throw new Error('Resposta da IA não contém conteúdo');
    }

    if (!candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('Estrutura da resposta:', JSON.stringify(candidate, null, 2));
      throw new Error(`Resposta da IA incompleta (${candidate.finishReason || 'motivo desconhecido'}). As imagens podem estar muito grandes.`);
    }

    const textResponse = candidate.content.parts[0].text;
    
    if (!textResponse) {
      throw new Error('Resposta da IA está vazia');
    }
    
    // Parse do JSON
    let analysisResult: AnalysisResult;
    try {
      let cleanedText = textResponse.trim();
      
      // Remover marcadores de código markdown se existirem
      cleanedText = cleanedText.replace(/^```json\s*/gmi, '');
      cleanedText = cleanedText.replace(/^```\s*/gm, '');
      cleanedText = cleanedText.replace(/```\s*$/gm, '');
      
      // Extrair apenas o JSON
      const jsonStartIndex = cleanedText.indexOf('{');
      const jsonEndIndex = cleanedText.lastIndexOf('}');
      
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        cleanedText = cleanedText.substring(jsonStartIndex, jsonEndIndex + 1);
      }
      
      analysisResult = JSON.parse(cleanedText);
      
      console.log('✅ Análise concluída com sucesso!');
      
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', parseError);
      throw new Error('Erro ao processar resposta da IA');
    }

    return {
      success: true,
      data: analysisResult
    };

  } catch (error: any) {
    console.error('Erro na análise:', error);
    return {
      success: false,
      error: error.message || 'Erro ao processar a análise'
    };
  }
}

/**
 * Verifica se a API está configurada
 */
export function isGeminiConfigured(): boolean {
  return !!GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here';
}

const geminiService = {
  analisarConformidadeObra,
  isGeminiConfigured
};

export default geminiService;

