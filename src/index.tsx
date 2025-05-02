// src/index.tsx 主程式入口

import { GM_getValue } from '$';

import { render } from "solid-js/web";
import App from "./App";
import Dashboard from "./components/Dashboard";
import 'virtual:uno.css'
import './styles/global.css';


/**
 * 創建 Dashboard 容器
 */
function createDashboardElement(): HTMLDivElement {
  const dashboardContainer = document.createElement("div");
  dashboardContainer.id = "friendly-tronclass-dashboard";
  document.body.appendChild(dashboardContainer);
  return dashboardContainer;
}

/**
 * 添加Material Design相關資源
 */
function addMaterialResources(): void {
  // 檢查是否已添加
  if (document.getElementById('material-icons-link')) {
    return;
  }

  // 添加Material Icons字體
  const linkElement = document.createElement('link');
  linkElement.id = 'material-icons-link';
  linkElement.rel = 'stylesheet';
  linkElement.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  document.head.appendChild(linkElement);

  // 添加Roboto字體（Material Design推薦字體）
  const fontElement = document.createElement('link');
  fontElement.rel = 'stylesheet';
  fontElement.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
  document.head.appendChild(fontElement);
}

/**
 * 主函數 - entry point
 */
function main(): void {
  // 檢查腳本是否已經運行，避免重複初始化
  if (document.getElementById("friendly-tronclass-root")) {
    console.debug("Friendly TronClass 已經在運行中");
    return;
  }

  // 添加Material Design資源
  addMaterialResources();

  // 初始化 Dashboard
  const dashboardElement = createDashboardElement();
  render(() => <Dashboard />, dashboardElement);

  // 等待 DOM 準備好
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
}

/**
 * 初始化 Solid.js 應用
 */
function initApp(): void {
  // create & mount root element
  const root = document.createElement("div");
  root.id = "friendly-tronclass-root";
  document.body.appendChild(root);
  render(() => <App />, root);

  // get settings
  const settings = GM_getValue('friendly_tronclass_settings', '{}');
  const parsedSettings = JSON.parse(settings);

  // debug mode
  if (parsedSettings.debugMode) {
    console.debug("Friendly TronClass 初始化完成");
    console.debug("OpenAI API 配置狀態:", parsedSettings.apiKey ? "已配置" : "未配置");
  }
}

// 執行主函數
main();