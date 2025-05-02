/**
 * ButtonInjector.tsx
 * 監視DOM並將MyButton注入到指定的元素中
 */
import { Component, onMount, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import MyButton from "./MyButton";

const ButtonInjector: Component = () => {
  // 按鈕點擊處理函數
  const handleButtonClick = () => {
    alert("MyButton 被點擊了！");
    // 你可以在這裡添加其他功能
  };

  // 創建按鈕元素並注入到指定容器
  const injectButton = (container: Element) => {
    // 檢查是否已經注入
    if (container.querySelector(".my-custom-button")) {
      return;
    }

    // 創建包裝容器
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "my-custom-button ml-4";
    container.appendChild(buttonContainer);

    // 渲染按鈕
    render(() => (
      <MyButton 
        text="Friendly Action" 
        onClick={handleButtonClick} 
        color="primary"
        variant="filled"
        // icon="star"
        size="md"
      />
    ), buttonContainer);
  };

  // 處理DOM變化
  const handleMutation = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        // 檢查新添加的節點
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 檢查元素本身
            const element = node as Element;
            if (element.matches(".activity-title.material")) {
              injectButton(element);
            }

            // 檢查子元素
            element.querySelectorAll(".activity-title.material").forEach((el) => {
              injectButton(el);
            });
          }
        });

        // 檢查現有的元素
        document.querySelectorAll(".activity-title.material").forEach((el) => {
          injectButton(el);
        });
        document.querySelectorAll(".subject").forEach((el) => {
          injectButton(el);
        });
      }
    }
  };

  onMount(() => {
    // 初始檢查現有元素
    document.querySelectorAll(".activity-title.material").forEach((el) => {
      injectButton(el);
    });

    // 設置 MutationObserver 來監視 DOM 變化
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 清理時斷開 observer
    onCleanup(() => {
      observer.disconnect();
    });
  });

  return null; // 這個組件不渲染任何可見內容
};

export default ButtonInjector;