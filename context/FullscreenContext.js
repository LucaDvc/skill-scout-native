import React, { createContext, useContext, useRef, useState } from 'react';
import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';

const FullscreenContext = createContext(false);

export const useFullscreenContext = () => useContext(FullscreenContext);

export const FullscreenProvider = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoLessonStep, setVideoLessonStep] = useState(null);

  const videoRef = useRef(null);

  const handleEnterFullscreen = async () => {
    setStatusBarHidden(true, 'fade');
    const { positionMillis, shouldPlay } =
      await videoRef.current.getStatusAsync();
    setIsFullscreen(true);
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
    await videoRef.current.setStatusAsync({ positionMillis, shouldPlay });
  };

  const handleExitFullscreen = async () => {
    setStatusBarHidden(false, 'fade');
    const { positionMillis, shouldPlay } =
      await videoRef.current.getStatusAsync();
    setIsFullscreen(false);
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    await videoRef.current.setStatusAsync({ positionMillis, shouldPlay });
  };

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen,
        setIsFullscreen,
        videoLessonStep,
        setVideoLessonStep,
        videoRef,
        handleEnterFullscreen,
        handleExitFullscreen,
      }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};
