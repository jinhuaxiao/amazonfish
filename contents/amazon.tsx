import cssText from "data-text:~style.css";
import { useEffect, useState } from "react";

export const config: PlasmoCSConfig = {
  matches: ["*://*.amazon.com/*"],
  all_frames: true,
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = ({ selector, newValue }) => {
  useEffect(() => {
    if (selector && newValue) {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = newValue;
      }
            // 新增的逻辑

    }

    const brandElement = document.querySelector('#brand');
    if (brandElement) {
      let targetElement;
      if (brandElement.shadowRoot) {
        targetElement = brandElement.shadowRoot.querySelector('#katal-id-6 > div > div.header-row-text.value > div.selection-text > slot');
      } else {
        targetElement = brandElement.querySelector('#katal-id-6 > div > div.header-row-text.value > div.selection-text > slot');
      }
      if (targetElement) {
        targetElement.textContent = 'Yutacorex';
      }
    }
  }, [selector, newValue]);

  return null;
};

export default () => {
  const [selector, setSelector] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.selector && request.newValue) {
        setSelector(request.selector);
        setNewValue(request.newValue);
      }
    });
  }, []);



  return <PlasmoOverlay selector={selector} newValue={newValue} />;
};