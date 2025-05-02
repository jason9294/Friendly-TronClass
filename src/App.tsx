/**
 * src/App.tsx 主應用組件
 */
import { GM_getValue } from '$';

import { Component, createSignal, onMount } from "solid-js";
import {
  antiDisableCopy,
  antiDisableCtxMenu,
  antiFullscreenEnforcement,
  antiDisableDevtools,
  antiDisableTxtSelection,
  removeWatermark,
} from "./utils/antiCheat";
import ButtonInjector from "./components/ButtonInjector";
import { AppSettings, DEFAULT_SETTINGS } from "./types/settings";

/**
 * 功能配置類型
 */
interface FeatureConfig {
  name: string;
  enabled: boolean;
  function: () => void;
  description: string;
}

/**
 * App 組件
 * 初始化並管理所有反反作弊功能
 */
const App: Component = () => {
  const [settings, setSettings] = createSignal<AppSettings>({ ...DEFAULT_SETTINGS });

  // 功能配置列表
  const [features, setFeatures] = createSignal<FeatureConfig[]>([
    {
      name: "防禁用複製",
      enabled: true,
      function: antiDisableCopy,
      description: "允許複製、剪切和貼上操作"
    },
    {
      name: "防禁用右鍵菜單",
      enabled: true,
      function: antiDisableCtxMenu,
      description: "允許使用右鍵菜單"
    },
    {
      name: "防全螢幕強制",
      enabled: true,
      function: antiFullscreenEnforcement,
      description: "防止強制全螢幕和離開視窗限制"
    },
    {
      name: "防禁用開發者工具",
      enabled: true,
      function: antiDisableDevtools,
      description: "允許使用開發者工具"
    },
    {
      name: "防禁用文字選取",
      enabled: true,
      function: antiDisableTxtSelection,
      description: "允許選取文字"
    },
    {
      name: "移除浮水印",
      enabled: false,
      function: removeWatermark,
      description: "移除考試頁面浮水印（較明顯，預設停用）"
    }
  ]);

  // 初始化功能
  onMount(() => {
    // 載入設置
    try {
      const savedSettings = GM_getValue('friendly_tronclass_settings', null);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('載入設置失敗:', error);
    }

    // 初始化反作弊功能
    const debugMode = settings().debugMode;
    if (debugMode) {
      console.debug("Friendly TronClass 已激活");
    }

    initFeatures();
  });

  /**
   * 初始化所有已啟用的功能
   */
  const initFeatures = () => {
    features().forEach(feature => {
      if (feature.enabled) {
        try {
          feature.function();
          if (settings().debugMode) {
            console.debug(`已啟用功能: ${feature.name}`);
          }
        } catch (error) {
          console.error(`啟用功能失敗: ${feature.name}`, error);
        }
      }
    });
  };

  return (
    <>
      <ButtonInjector />
    </>
  );
};

export default App;