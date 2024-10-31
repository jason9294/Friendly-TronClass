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


  function antiDisableCopy() {
    // 移除複製保護 status: working
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

  function antiDisableCtxMenu() {
    // 移除右鍵限制 status: working
    document.addEventListener("contextmenu", (e) => e.stopPropagation(), true);
  }

  function antiFullscreenEnforcement() {
    // 移除全螢幕&視窗限制 status: working
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

  function antiDisableTxtSelection() {
    // 移除文字選取保護
    document.querySelectorAll("*").forEach((el) => {
      el.style.userSelect = "text"; // 開啟文字選取
    });
  }

  function removeWatermark() {
    window.addEventListener("load", () => {
      document.getElementById("Symbol(water-mark)").style.background = "";
    }, false
    );
  }

  main();
})();
