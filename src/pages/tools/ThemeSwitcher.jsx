// src/components/ThemeSwitch.js
import React, { useState } from "react";
import { Switch, ConfigProvider, theme } from "antd";

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const toggleCompactMode = () => {
    setIsCompact(!isCompact);
  };

  const currentTheme = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    compact: isCompact,
  };

  return (
    <ConfigProvider theme={currentTheme}>
      <div style={{ marginBottom: 16 }}>
        <Switch
          checked={isDark}
          onChange={toggleDarkMode}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
      <div>
        <Switch
          checked={isCompact}
          onChange={toggleCompactMode}
          checkedChildren="Compact"
          unCheckedChildren="Default"
        />
      </div>
    </ConfigProvider>
  );
};

export default ThemeSwitch;
