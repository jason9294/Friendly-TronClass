// ==UserScript==
// @name         Friendly TronClass
// @namespace    https://github.com/jason9294
// @version      0.1
// @description  Counter Anti-Cheat
// @match        https://eclass.yuntech.edu.tw/course/*
// @match        https://eclass.yuntech.edu.tw/exam/*
// @match        https://tronclass.com.tw/course/*
// @match        https://tronclass.com.tw/exam/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function main() {
    antiDisableCopy();
    antiDisableCtxMenu();
    antiFullscreenEnforcement();
    antiDisableDevtools();
    antiDisableTxtSelection();
    removeWatermark();
  }

  const isOpenDevToolKey = (e) => (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")));

  /**
   * 防止禁用複製
   */
  function antiDisableCopy() {
    for (const eventName of ["copy", "cut", "paste"]) {
      document.addEventListener(eventName, (e) => e.stopPropagation(), true);
    }

    // 停止覆寫 navigator.clipboard API
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      value: {
        writeText: () => { },
        readText: () => { },
      },
    });
  }

  /**
   * 防止禁用右鍵 ContextMenu
   */
  function antiDisableCtxMenu() {
    document.addEventListener("contextmenu", (e) => e.stopPropagation(), true);
  }

  /**
   * 防止全螢幕 & 離開視窗限制
   */
  function antiFullscreenEnforcement() {
    const events = [
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

    events.forEach((eventName) => {
      window.addEventListener(eventName, (e) => { e.stopImmediatePropagation(); }, true);
    });
  }

  /**
   * 防止禁用開發者工具
   */
  function antiDisableDevtools() {
    // 反制禁止開啟控制台 status: maybe working
    // HACK 透過覆寫 console.log 來阻止開啟控制台
    // TODO 應該要再找更好的方法，避免影響 console 的使用
    console.log = function () { };
    console.table = function () { };
    console.clear = function () { };

    // 攔截特定快捷鍵，如 F12、Ctrl+Shift+I
    window.addEventListener("keydown", (e) => {
      if (isOpenDevToolKey(e)) {
        e.stopImmediatePropagation();
      }
    }, true);
  }

  /**
   * 移除文字選取保護
   */
  function antiDisableTxtSelection() {
    document.querySelectorAll("*").forEach((el) => {
      el.style.userSelect = "text"; // 開啟文字選取
    });
  }

  /**
   *移除考試頁面浮水印 
   */
  function removeWatermark() {
    window.addEventListener("load", () => {
      document.getElementById("Symbol(water-mark)").style.background = "";
    }, false
    );
  }

  /**
   * 允許下載不可下載的檔案
   */
  function alwaysAllowDownload() {
    // TODO
  }

  main();
})();
