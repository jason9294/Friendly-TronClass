/**
 * TronClass 反反作弊工具函數
 * 包含處理複製限制、右鍵菜單、全螢幕限制等功能的函數
 */

import { COPY_PASTE_EVENTS, FULLSCREEN_VISIBILITY_EVENTS, isOpenDevToolKey } from './constants';

/**
 * 防止禁用複製、剪切和貼上功能
 * 透過攔截相關事件並阻止傳播來實現
 */
export function antiDisableCopy(): void {
  // 取消複製、剪切和貼上事件的攔截
  for (const eventName of COPY_PASTE_EVENTS) {
    document.addEventListener(eventName, (e) => e.stopPropagation(), true);
  }

  // 停止覆寫 navigator.clipboard API
  try {
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      value: {
        writeText: () => Promise.resolve(),
        readText: () => Promise.resolve(""),
      },
    });
  } catch (error) {
    console.debug("Failed to override clipboard API", error);
  }
}

/**
 * 防止禁用右鍵菜單
 * 攔截 contextmenu 事件並阻止傳播
 */
export function antiDisableCtxMenu(): void {
  document.addEventListener("contextmenu", (e) => e.stopPropagation(), true);
}

/**
 * 防止全螢幕強制和頁面可見性檢測
 * 攔截相關事件並阻止傳播
 */
export function antiFullscreenEnforcement(): void {
  FULLSCREEN_VISIBILITY_EVENTS.forEach((eventName) => {
    window.addEventListener(
      eventName,
      (e) => { e.stopImmediatePropagation(); },
      true
    );
  });
}

/**
 * 防止禁用開發者工具
 * 透過覆寫 console 方法和攔截開發者工具快捷鍵
 */
export function antiDisableDevtools(): void {
  // 覆寫 console 方法
  // 注意：這樣做會影響使用 console 進行調試
  // 暫存原始 console 方法
  const originalConsole = {
    log: console.log,
    table: console.table,
    clear: console.clear,
  };

  // 覆寫方法
  console.log = function (...args) {
    // 實現空方法，但保留原始方法的可能性
    return originalConsole.log(...args);
  };
  console.table = function (...args) {
    return originalConsole.table(...args);
  };
  console.clear = function (...args) {
    return originalConsole.clear(...args);
  };

  // 攔截特定快捷鍵，如 F12、Ctrl+Shift+I
  window.addEventListener("keydown", (e) => {
    if (isOpenDevToolKey(e)) {
      e.stopImmediatePropagation();
    }
  }, true);
}

/**
 * 移除文字選取保護
 * 將所有元素的 user-select 樣式設為 text
 */
export function antiDisableTxtSelection(): void {
  // 立即應用到當前元素
  document.querySelectorAll("*").forEach((el) => {
    (el as HTMLElement).style.userSelect = "text";
  });

  // 使用 MutationObserver 監視 DOM 變化，應用到新元素
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            (node as HTMLElement).style.userSelect = "text";
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/**
 * 移除考試頁面浮水印
 * 注意：使用此功能可能過於明顯，謹慎使用
 */
export function removeWatermark(): void {
  const removeWatermarkHandler = () => {
    const watermark = document.getElementById("Symbol(water-mark)");
    if (watermark) {
      watermark.style.background = "";
    }
  };

  // 確保在頁面完全加載後執行
  if (document.readyState === 'complete') {
    removeWatermarkHandler();
  } else {
    window.addEventListener("load", removeWatermarkHandler, { once: true });
  }
}

/**
 * 允許下載不可下載的檔案
 * 待實現功能
 */
export function alwaysAllowDownload(): void {
  // TODO: 實現允許下載被限制的檔案的功能
  console.debug("允許下載功能尚未實現");
}