import React, { useEffect, useRef, useState } from 'react';
import { Tab, TabView, useTheme } from '@ui-kitten/components';

import TextLessonStep from '../../../../components/learning/lessons/steps/TextLessonStep';
import VideoLessonStep from '../../../../components/learning/lessons/steps/VideoLessonStep';
import QuizLessonStep from '../../../../components/learning/lessons/steps/QuizLessonStep';
import CodeChallengeLessonStep from '../../../../components/learning/lessons/steps/CodeChallengeLessonStep';

import {
  CodeIcon,
  QuestionIcon,
  TextAlignLeftIcon,
  VideoIcon,
  SwapIcon,
  WriteIcon,
} from '../../../../components/extra/icons';
import { useWindowDimensions } from 'react-native';
import { useLessonContext } from '../../../../context/LessonContext';
import { useFullscreenContext } from '../../../../context/FullscreenContext';
import learningService from '../../../../features/learning/learningService';
import { useSelector } from 'react-redux';
import SortingProblemStep from './SortingProblemStep';

const stepConfig = {
  text: {
    component: TextLessonStep,
    icon: TextAlignLeftIcon,
  },
  video: {
    component: VideoLessonStep,
    icon: VideoIcon,
  },
  quiz: {
    component: QuizLessonStep,
    icon: QuestionIcon,
  },
  codechallenge: {
    component: CodeChallengeLessonStep,
    icon: CodeIcon,
  },
  text_problem: {
    component: CodeChallengeLessonStep,
    icon: WriteIcon,
  },
  sorting_problem: {
    component: SortingProblemStep,
    icon: SwapIcon,
  },
};

const LessonStepsTabs = () => {
  const { lesson, selectedStepIndex, setSelectedStepIndex } = useLessonContext();
  const { isFullscreen, videoLessonStep } = useFullscreenContext();
  const { accessToken: token } = useSelector((state) => state.users);

  const topNavHeight = 56;
  const { height } = useWindowDimensions();
  const theme = useTheme();

  const shouldLoadComponent = (index) => index === selectedStepIndex;

  const [intervalId, setIntervalId] = useState(null);
  const timeSpentRef = useRef(0);

  useEffect(() => {
    // Clear the previous interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Reset the timer when the selected step changes
    timeSpentRef.current = 0;

    // Start a new timer
    const newIntervalId = setInterval(() => {
      timeSpentRef.current += 1;
    }, 1000);

    // Save the interval ID to state
    setIntervalId(newIntervalId);

    const sendEngagementData = async () => {
      // Send the data to the server if the user spent more than 5 seconds on the step
      if (timeSpentRef.current >= 5) {
        try {
          const selectedStep = lesson.lesson_steps[selectedStepIndex];
          await learningService.sendEngagementData(
            selectedStep.id,
            timeSpentRef.current,
            token
          );
        } catch (error) {
          console.error('Failed to send engagement data', error);
        }
      }
      // Cleanup the interval on unmount or when the step changes
      clearInterval(newIntervalId);
    };

    return () => {
      sendEngagementData();
    };
  }, [selectedStepIndex]);

  return !isFullscreen ? (
    <TabView
      selectedIndex={selectedStepIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={(index) => setSelectedStepIndex(index)}
      style={{
        height: height - topNavHeight,
        backgroundColor: theme['color-basic-200'],
      }}
    >
      {lesson.lesson_steps.map((step) => {
        const { component: Component, icon } = stepConfig[step.type];
        const Icon = icon;
        return (
          <Tab
            key={step.id}
            icon={(props) => (
              <Icon {...props} fill={step.completed ? '#36D3A7' : 'black'} />
            )}
          >
            <Component lessonStep={step} />
          </Tab>
        );
      })}
    </TabView>
  ) : (
    <VideoLessonStep lessonStep={videoLessonStep} />
  );
};

export default LessonStepsTabs;
