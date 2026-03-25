export interface Issue {
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
  original: string;
  suggestion: string;
  reason: string;
  offset: number;
  length: number;
  id?: string;
  ignored?: boolean;
  confidence?: number;
  priority?: number;
  source?: 'rule' | 'llm' | 'context';
}

export interface AnalysisContext {
  domain?: string;
  editorType?: string;
  activeSentence?: string;
  previousText?: string;
  nextText?: string;
  fullTextExcerpt?: string;
}

export interface AnalyzeRequest {
  text: string;
  apiKey?: string;
  model?: string;
  provider?: LLMProvider;
  baseUrl?: string;
  ignoredIssues?: string[];
  customRules?: CustomRule[];
  dictionary?: string[];
  context?: AnalysisContext;
}

export interface CustomRule {
  id: string;
  pattern: string;
  replacement: string;
  description: string;
  type: 'grammar' | 'spelling' | 'clarity' | 'style';
}

export interface AnalysisMetadata {
  textLength: number;
  issuesCount: number;
  processingTimeMs: number;
  contextUsed?: boolean;
  model?: string;
  provider?: string;
}

export interface AnalyzeResponse {
  issues: Issue[];
  metadata?: AnalysisMetadata;
  error?: string;
  message?: string;
}

export interface AutocompleteRequest {
  text: string;
  cursor: number;
  apiKey?: string;
  model?: string;
  provider?: LLMProvider;
  baseUrl?: string;
  context?: AnalysisContext;
}

export interface AutocompleteResponse {
  suggestion: string;
  confidence: number;
  replaceStart: number;
  replaceEnd: number;
  source: 'heuristic' | 'llm';
  error?: string;
}

export type LLMProvider = 
  | 'asi1'
  | 'openai'
  | 'openrouter'
  | 'groq'
  | 'together'
  | 'ollama'
  | 'custom';

export interface ProviderConfig {
  id: LLMProvider;
  name: string;
  baseUrl: string;
  models: string[];
  requiresApiKey: boolean;
  description: string;
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'asi1',
    name: 'ASI:One',
    baseUrl: 'https://api.asi1.ai/v1',
    models: ['asi1'],
    requiresApiKey: true,
    description: 'Blazing fast intelligence',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    requiresApiKey: true,
    description: 'Official OpenAI API',
  },
];
