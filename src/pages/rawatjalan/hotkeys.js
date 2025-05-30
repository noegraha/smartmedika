import React from 'react'
import { useHotkeys } from "react-hotkeys-hook";
import { useHistory } from "react-router-dom";

export const Hotkey = ({ hotkey }) => {
  const history = useHistory();

  useHotkeys(hotkey.key, () => history.push(hotkey.route), hotkey.options);
  // useHotkeys(
  //   hotkey.key,
  //   () => window.location.assign(hotkey.route),
  //   hotkey.options
  // );

  return null;
};

export const Hotkeys = ({ hotkeys }) => (
  <>
    {hotkeys.map((hotkey, i) => (
      <Hotkey key={i} hotkey={hotkey} />
    ))}
  </>
);