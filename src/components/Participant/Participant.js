/**
 * Copyright (c) [2015-2020] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import janusApi from '../../janus-api';
import { Janus } from '../../vendor/janus';
import MuteButton from '../MuteButton';
import ToggleVideo from '../ToggleVideo';
import StopScreenSharing from '../StopScreenSharing';
import Reconnect from '../Reconnect';
import { actionCreators as participantsActions } from '../../state/ducks/participants';
import { classNames } from '../../utils/common';

function setVideo(id, videoRef) {
  const stream = janusApi.getFeedStream(id);

  if (stream !== null) {
    console.log('Attaching media stream', id);
    Janus.attachMediaStream(videoRef, stream);
  }
}

function toggleFocus(id, focus) {
  return focus === 'user' ? participantsActions.unsetFocus() : participantsActions.setFocus(id);
}

function Participant({ id, display, isPublisher, isLocalScreen, streamReady, focus, speaking, audio, video }) {
  const dispatch = useDispatch();
  const videoRef = React.createRef();

  useEffect(() => setVideo(id, videoRef.current), [streamReady]);

  return (
    <div className={classNames(
      "relative group p-1 border-2 border-white bg-white",
      "transition duration-150 ease-in-out",
      focus === 'user' && "border-secondary shadow-md",
      speaking && "border-blue-300"
    )}>
      <video
        ref={videoRef}
        muted={isPublisher}
        autoPlay
        className={classNames(
          isPublisher && !isLocalScreen && 'mirrored'
        )}
        onClick={() => dispatch(toggleFocus(id, focus))}
      />
      <div className="flex px-1 items-center bg-gray-200 text-center text-xs sm:text-sm md:text-base">
        <span className="ml-1">{display}</span>
      </div>
      <div className="bg-primary-dark opacity-75 absolute inset-0 hidden group-hover:flex flex-wrap">
        {isPublisher && isLocalScreen && <StopScreenSharing id={id} />}
        {!isLocalScreen && <MuteButton participantId={id} />}
        {isPublisher && !isLocalScreen && <ToggleVideo video={video} />}
        {!isPublisher && <Reconnect participantId={id} />}
      </div>
    </div>
  );
}

export default React.memo(Participant);
