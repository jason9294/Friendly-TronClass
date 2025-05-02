/**
 * 應用設置接口
 */
export interface AppSettings {
  // OpenAI 設置
  apiKey: string;
  systemPrompt: string;
  model: string;

  // 通用設置
  debugMode: boolean;

  // 預留其他設置
  [key: string]: any;
}

// 默認設置
export const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '',
  systemPrompt: '你是一個幫助學生學習的助手，請提供清晰簡潔的解答。',
  model: 'gpt-4.1',
  debugMode: false
};