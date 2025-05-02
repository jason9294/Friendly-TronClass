/**
 * 簡單的設置面板組件
 */
import { GM_getValue, GM_setValue, GM_registerMenuCommand } from '$';

import { Component, createSignal, onMount } from 'solid-js';
import { AppSettings, DEFAULT_SETTINGS } from '../types/settings';
import BaseButton from './ui/BaseButton';
const Dashboard: Component = () => {
  // 設置狀態
  const [settings, setSettings] = createSignal<AppSettings>({ ...DEFAULT_SETTINGS });
  const [isVisible, setIsVisible] = createSignal(false);
  const [message, setMessage] = createSignal('');
  // 控制動畫狀態
  const [isClosing, setIsClosing] = createSignal(false);
  const [isMessageClosing, setIsMessageClosing] = createSignal(false);

  // 初始化
  onMount(() => {
    try {
      const savedSettings = GM_getValue('friendly_tronclass_settings', null);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('載入設置失敗:', error);
    }
  });


  // 保存設置
  const saveSettings = () => {
    try {
      GM_setValue('friendly_tronclass_settings', JSON.stringify(settings()));
      // showMessage('設置已保存！');
      alert('設置已保存！');
    } catch (error) {
      console.error('保存設置失敗:', error);
      // showMessage('保存失敗!', 'error');
      alert('保存失敗!');
    }
  };

  // 顯示消息
  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setIsMessageClosing(false);
    setTimeout(() => {
      setIsMessageClosing(true);
      setTimeout(() => setMessage(''), 300);
    }, 3000);
  };

  // 更新設置值
  const updateSetting = (key: keyof AppSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // 重置設置
  const resetSettings = () => {
    if (confirm('確定要重置所有設置嗎？')) {
      setSettings({ ...DEFAULT_SETTINGS });
      saveSettings();
    }
  };

  // 關閉設置面板
  const closePanel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  // 註冊 Tampermonkey 菜單
  const registerMenuCommand = () => {
    if (typeof GM_registerMenuCommand !== 'undefined') {
      GM_registerMenuCommand('⚙️ Friendly TronClass 設置', () => {
        setIsVisible(true);
      });
    }
  };

  // 初始化菜單
  registerMenuCommand();

  return (
    <>
      {isVisible() && (
        <div
          class={`fixed inset-0 bg-black/50 flex justify-center items-center z-10000 font-roboto ${isClosing() ? 'animate-fade-out' : 'animate-fade-in'}`}
          onClick={closePanel}
          style={{
            animation: isClosing() ? 'fadeOut 0.3s' : 'fadeIn 0.3s',
          }}
        >
          <div
            class={`bg-white rounded-lg shadow-lg w-[90%] max-w-500px max-h-[90vh] overflow-y-auto p-0 ${isClosing() ? 'animate-zoom-out' : 'animate-zoom-in'}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosing() ? 'zoomOut 0.3s' : 'zoomIn 0.3s',
            }}
          >
            <div class="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 class="m-0 text-lg text-gray-700">Friendly TronClass 設置</h2>
              <button
                onClick={closePanel}
                class="bg-transparent border-0 text-xl cursor-pointer text-gray-500 hover:text-gray-800 transition duration-200"
              >
                ×
              </button>
            </div>

            <div class="p-3">
              <div class="mb-5">
                <label class="block mb-2 font-medium text-gray-700" for="apiKey">
                  OpenAI API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  value={settings().apiKey}
                  onInput={(e) => updateSetting('apiKey', e.target.value)}
                  placeholder="sk-..."
                  class="w-full p-3 border border-gray-300 rounded text-sm transition duration-200 focus:border-blue-500 focus:outline-none"
                />
                <div class="text-xs text-gray-500 mt-2">你的 OpenAI API 密鑰，格式如 sk-...</div>
              </div>

              <div class="mb-5">
                <label class="block mb-2 font-medium text-gray-700" for="systemPrompt">
                  System Prompt
                </label>
                <textarea
                  id="systemPrompt"
                  value={settings().systemPrompt}
                  onInput={(e) => updateSetting('systemPrompt', e.target.value)}
                  placeholder="輸入默認的系統提示詞..."
                  class="w-full p-3 border border-gray-300 rounded text-sm min-h-100px resize-y transition duration-200 focus:border-blue-500 focus:outline-none"
                />
                <div class="text-xs text-gray-500 mt-2">默認的系統提示詞，用於設定 AI 助手的行為和回應風格</div>
              </div>

              <div class="mb-5">
                <label class="block mb-2 font-medium text-gray-700" for="model">
                  模型
                </label>
                <select
                  id="model"
                  value={settings().model}
                  onChange={(e) => updateSetting('model', e.target.value)}
                  class="w-full p-3 border border-gray-300 rounded text-sm transition duration-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
                <div class="text-xs text-gray-500 mt-2">選擇要使用的 OpenAI 模型</div>
              </div>

              <div class="mb-5">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings().debugMode}
                    onChange={(e) => updateSetting('debugMode', e.target.checked)}
                    class="mr-3"
                  />
                  啟用調試模式
                </label>
                <div class="text-xs text-gray-500 mt-2 ml-6">顯示更多日誌信息，幫助故障排除</div>
              </div>
            </div>

            <div class="flex justify-end p-5 border-t border-gray-200">
              {/* <button
                onClick={resetSettings}
                class="bg-gray-100 text-gray-700 px-5 py-2.5 rounded font-medium mr-3 transition duration-200 hover:bg-gray-200 hover:shadow-sm"
              >
                重置
              </button> */}
              <BaseButton
                onClick={resetSettings}
                variant="primary"
                size="md"
                rounded
              >
                重置
              </BaseButton>
              <button
                onClick={saveSettings}
                class="bg-blue-600 text-white px-5 py-2.5 rounded font-medium transition duration-200 hover:bg-blue-700 hover:shadow-sm"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {message() && (
        <div
          class={`fixed bottom-5 right-5 p-3 bg-green-500 text-white rounded shadow-md z-10001 max-w-300px w-auto pointer-events-none ${isMessageClosing() ? 'animate-slide-out' : 'animate-slide-in'}`}
          style={{
            animation: isMessageClosing() ? 'slideOut 0.3s' : 'slideIn 0.3s'
          }}
        >
          {message()}
        </div>
      )}

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes zoomIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        @keyframes zoomOut {
          from { 
            opacity: 1; 
            transform: scale(1); 
          }
          to { 
            opacity: 0; 
            transform: scale(0.95) translateY(10px); 
          }
        }
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slideOut {
          from { 
            opacity: 1; 
            transform: translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: translateY(20px); 
          }
        }
      `}
      </style>
    </>
  );
};

export default Dashboard;