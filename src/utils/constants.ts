/**
 * 定義通用常數
 */

/**
 * 開發者工具鍵盤快捷鍵檢測
 * @param e - 鍵盤事件
 * @returns 是否為開啟開發者工具的快捷鍵
 */
export const isOpenDevToolKey = (e: KeyboardEvent): boolean => (
  e.key === "F12" ||
  (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J"))
);

/**
 * 需要監聽的全螢幕和頁面可見性相關事件
 */
export const FULLSCREEN_VISIBILITY_EVENTS = [
  "fullscreenElement",
  "fullscreenEnabled",
  "mozFullScreenEnabled",
  "webkitFullscreenEnabled",
  "msFullscreenEnabled",
  "webkitIsFullScreen",
  "visibilitychange",
  "webkitvisibilitychange",
  "blur",
];

/**
 * 需要監聽的複製剪貼相關事件
 */
export const COPY_PASTE_EVENTS = ["copy", "cut", "paste"];