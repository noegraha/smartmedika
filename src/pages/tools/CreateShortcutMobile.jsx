import { Button } from "antd";
import React from "react";

const ShortcutCreator = () => {
  const handleCreateShortcut = async () => {
    try {
      if ("share" in navigator) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        console.log("Shortcut created successfully.");
      } else {
        console.log("Web Share API not supported.");
      }
    } catch (error) {
      console.error("Error creating shortcut:", error);
    }
  };

  return (
    <Button type="link" onClick={handleCreateShortcut}>
      Buat Shortcut
    </Button>
  );
};

export default ShortcutCreator;
