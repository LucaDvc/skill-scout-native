import React from 'react';
import { Tab, TabView, useTheme } from '@ui-kitten/components';

import TextLessonStep from '../../../../components/learning/lessons/steps/TextLessonStep';
import VideoLessonStep from '../../../../components/learning/lessons/steps/VideoLessonStep';
import QuizLessonStep from '../../../../components/learning/lessons/steps/QuizLessonStep';
import CodeChallengeLessonStep from '../../../../components/learning/lessons/steps/CodeChallengeLessonStep';

import {
  CodeCheckedIcon,
  CodeIcon,
  QuestionCheckedIcon,
  QuestionIcon,
  TextAlignLeftCheckedLightgrayIcon,
  TextAlignLeftIcon,
  VideoCheckedIcon,
  VideoIcon,
} from '../../../../components/extra/icons';
import { useWindowDimensions } from 'react-native';
import { useLessonContext } from '../../../../context/LessonContext';
import { useFullscreenContext } from '../../../../context/FullscreenContext';

const stepConfig = {
  text: {
    component: TextLessonStep,
    icon: {
      completed: TextAlignLeftCheckedLightgrayIcon,
      default: TextAlignLeftIcon,
    },
  },
  video: {
    component: VideoLessonStep,
    icon: { completed: VideoCheckedIcon, default: VideoIcon },
  },
  quiz: {
    component: QuizLessonStep,
    icon: { completed: QuestionCheckedIcon, default: QuestionIcon },
  },
  codechallenge: {
    component: CodeChallengeLessonStep,
    icon: { completed: CodeCheckedIcon, default: CodeIcon },
  },
};

const LessonStepsTabs = () => {
  const { lesson, selectedStepIndex, setSelectedStepIndex } =
    useLessonContext();
  const { isFullscreen, videoLessonStep } = useFullscreenContext();

  const topNavHeight = 56;
  const { height } = useWindowDimensions();
  const theme = useTheme();

  const shouldLoadComponent = (index) => index === selectedStepIndex;

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
        const Icon = step.completed ? icon.completed : icon.default;
        return (
          <Tab
            key={step.id}
            icon={(props) => (
              <Icon {...props} fill={step.completed ? 'lightgray' : 'black'} />
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
