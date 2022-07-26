import React from 'react';
import { useAppSelector } from '../../hooks/redux';

const Notes = () => {
  const playerRefCurrentVal = useAppSelector(
    (state) => state.youtubeplayerRef.playerRef
  );

  return (
    <div>
      <button
        onClick={() => {
          playerRefCurrentVal.internalPlayer.pauseVideo();
        }}>
        Pause Video
      </button>
    </div>
  );
};

export default Notes;
