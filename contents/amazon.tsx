import cssText from "data-text:~style.css";
import { useEffect, useState } from "react";

export const config: PlasmoCSConfig = {
  matches: ["*://www.amazon.com/*"],
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