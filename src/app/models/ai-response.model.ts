export interface AiResponse {
  id?: string;
  apiProvider: string;
  model: string;
  prompt: string;
  response: string;
  tokensUsed?: number;
  temperature?: number;
  timestamp?: string;
  responseTimeMs?: number;
  status: string;
  errorMessage?: string;
  deleted?: boolean;
}
