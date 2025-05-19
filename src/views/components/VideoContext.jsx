// src/components/VideoContext.jsx
import React, { createContext, useContext, useState } from 'react';

const VideoCtx = createContext();

export function VideoProvider({ children }) {
  const [videoFile, setVideoFile] = useState(null);
  const [stopRecording, setStopRecording] = useState(() => () => { });

  return (
    <VideoCtx.Provider value={{ videoFile, setVideoFile, stopRecording, setStopRecording }}>
      {children}
    </VideoCtx.Provider>
  );
}

export function useVideo() {
  return useContext(VideoCtx);
}
