import { GoogleGenAI, Modality, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';

export interface Lead {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewsCount?: number;
  category?: string;
  details?: string;
  source: 'google_maps' | 'google_search';
}

export const prospectLeadsFromMaps = async (query: string, location: string): Promise<Lead[]> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Encontre leads de negócios para "${query}" em "${location}". 
  Extraia o nome, endereço, telefone, website (se disponível), avaliação, quantidade de avaliações e categoria de cada local.
  Retorne os dados estritamente no formato de um array JSON, sem blocos de código markdown ou texto adicional.
  Exemplo: [{"name": "Empresa A", "address": "Rua X", "phone": "123", "website": "www.a.com", "rating": 4.5, "reviewsCount": 100, "category": "Academia"}]`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        // responseMimeType: "application/json" is NOT supported with googleMaps
      },
    });

    const text = response.text || '[]';
    // Clean up potential markdown blocks
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const leadsData = JSON.parse(jsonStr);
    
    return Array.isArray(leadsData) ? leadsData.map((l: any, index: number) => ({
      ...l,
      id: `maps-${index}-${Date.now()}`,
      source: 'google_maps'
    })) : [];
  } catch (error) {
    console.error("Error prospecting from Maps:", error);
    return [];
  }
};

export const enrichLeadWithSearch = async (lead: Lead): Promise<Lead> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Pesquise mais informações sobre a empresa "${lead.name}" localizada em "${lead.address}".
  Tente encontrar o LinkedIn da empresa, e-mail de contato, ou outras informações relevantes para vendas.
  Resuma as descobertas em um campo de detalhes.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            details: { type: Type.STRING, description: "Resumo das informações encontradas no Google Search" },
            email: { type: Type.STRING },
            linkedin: { type: Type.STRING },
            website: { type: Type.STRING },
          }
        }
      },
    });

    const enrichment = JSON.parse(response.text || '{}');
    return {
      ...lead,
      details: enrichment.details || lead.details,
      website: enrichment.website || lead.website,
      // We could add more fields to Lead interface if needed
    };
  } catch (error) {
    console.error("Error enriching lead:", error);
    return lead;
  }
};
