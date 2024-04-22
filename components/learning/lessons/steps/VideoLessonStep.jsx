import { Dimensions, StyleSheet, View, Image } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { ResizeMode } from 'expo-av';
import React, { useState } from 'react';
import VideoPlayer from 'expo-video-player';
import { useFullscreenContext } from '../../../../context/FullscreenContext';
import { Text } from '@ui-kitten/components';
import StepsNavigationButtons from './StepsNavigationButtons';
import { useDispatch } from 'react-redux';
import {
  completeLessonStep,
  updateUiOnLessonStepComplete,
} from '../../../../features/learning/learningSlice';

const VideoLessonStep = ({ lessonStep }) => {
  const {
    isFullscreen,
    setVideoLessonStep,
    videoRef,
    handleEnterFullscreen,
    handleExitFullscreen,
  } = useFullscreenContext();
  const [isMute, setIsMute] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setVideoLessonStep(lessonStep);

    if (!lessonStep.completed) {
      dispatch(completeLessonStep(lessonStep.id));
      dispatch(updateUiOnLessonStepComplete(lessonStep.id));
    }

    const generateThumbnail = async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          lessonStep.video_file,
          {
            time: 15000,
          }
        );
        setThumbnail(uri);
      } catch (e) {
        console.warn(e);
      }
    };

    generateThumbnail();
  }, [lessonStep.id]);

  return (
    <View style={styles.contentContainer}>
      <View style={!isFullscreen && styles.videoContainer}>
        {!isFullscreen && (
          <Text category='h6' style={styles.text}>
            {lessonStep.title}
          </Text>
        )}
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: lessonStep.video_file,
            },
            ref: videoRef,
            isMuted: isMute,
            PosterComponent: () => (
              <Image
                source={{ uri: thumbnail }}
                style={{
                  height: isFullscreen
                    ? Dimensions.get('window').height
                    : Dimensions.get('window').width / 2,
                  width: Dimensions.get('window').width,
                }}
              />
            ),
          }}
          fullscreen={{
            inFullscreen: isFullscreen,
            enterFullscreen: handleEnterFullscreen,
            exitFullscreen: handleExitFullscreen,
          }}
          mute={{
            enterMute: () => setIsMute(!isMute),
            exitMute: () => setIsMute(!isMute),
            isMute,
            visible: true,
          }}
          style={{
            videoBackgroundColor: 'black',
            height: isFullscreen
              ? Dimensions.get('window').height
              : (Dimensions.get('window').width - 16) / 2,
            width: isFullscreen
              ? Dimensions.get('window').width
              : Dimensions.get('window').width - 16,
          }}
          header={
            <Text style={{ color: '#FFF', marginLeft: 4 }}>
              {lessonStep.title}
            </Text>
          }
        />
      </View>
      {!isFullscreen && <StepsNavigationButtons lessonStep={lessonStep} />}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 24,
    marginBottom: 24,
  },
});

export default VideoLessonStep;
