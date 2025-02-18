import React, { useEffect, useRef } from 'react';
import WFPlayer from 'wfplayer';

const MediaWaveform = () => {
  const waveformRef = useRef(null);
  const mediaRef = useRef(null); 

  useEffect(() => {
    const mediaElement = mediaRef.current;
    const container = waveformRef.current;

   
    const wf = new WFPlayer({
      container: container,
      mediaElement: mediaElement,
    });

   
    wf.load(mediaElement);

    return () => {
      wf.destroy();
    };
  }, []);

  return (
    <div>
    
      <div id="waveform" ref={waveformRef} style={{ width: '', height: '200px' }}></div>

     
      <audio ref={mediaRef} src="/sample.mp3" />
      {/* <video ref={mediaRef} src="path/to/video.mp4" /> */}
    </div>
  );
};

export default MediaWaveform;
