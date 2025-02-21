import React, { useEffect, useRef } from 'react';
import WFPlayer from 'wfplayer';

const MediaWaveform = ({ youtubeplaying }) => {
  const waveformRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const container = waveformRef.current;
    const mediaElement = mediaRef.current;

    if (!mediaElement) return;

   
    const wf = new WFPlayer({
      container: container,
      mediaElement: mediaElement,
    });

   
    wf.load(mediaElement);

    
    if (youtubeplaying) {
      mediaElement.play();  
    } else {
      mediaElement.pause(); 
    }

    
    return () => {
      wf.destroy();
    };
  }, [youtubeplaying]);  

  return (
    <div>
      <div id="waveform" ref={waveformRef} style={{ width: '100%', height: '150px' }}></div>

    
      <audio ref={mediaRef} src="/sample.mp3" />
    </div>
  );
};

export default MediaWaveform;
