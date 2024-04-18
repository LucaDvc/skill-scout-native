import React from 'react';
import { Tab, TabView } from '@ui-kitten/components';

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

const LessonStepsTabs = ({ lesson }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <TabView
      selectedIndex={selectedIndex}
      //   shouldLoadComponent={shouldLoadComponent}
      onSelect={(index) => setSelectedIndex(index)}
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
  );
};

export default LessonStepsTabs;
