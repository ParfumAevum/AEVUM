// ══════════════════════════════════════════════════════════════
// src/services/api.ts
// Instância configurada do Axios para comunicação com o backend.
// A URL base é lida da variável de ambiente VITE_API_URL.
// ══════════════════════════════════════════════════════════════

import axios, { type AxiosError, type AxiosResponse } from "axios";

// Instância Axios com a URL base da API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333/api",
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor de resposta: formata erros da API
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<unknown>) => {
    // Extrai a mensagem de erro do backend, se disponível
    const resposta = error.response?.data as any;
    const mensagem =
      resposta?.erro ||
      resposta?.message ||
      "Erro de comunicação com o servidor.";

    return Promise.reject(new Error(mensagem));
  }
);