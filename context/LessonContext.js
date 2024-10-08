import { useLocalSearchParams } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';

const LessonContext = createContext();

export function useLessonContext() {
  return useContext(LessonContext);
}

export function LessonProvider({ children, lesson: currentLesson }) {
  const { lessonStepId } = useLocalSearchParams();
  const initialIndex =
    currentLesson.lesson_steps.findIndex((step) => step.id === lessonStepId) ?? 0;

  const [lesson, setLesson] = useState(currentLesson);
  const [selectedStepIndex, setSelectedStepIndex] = useState(initialIndex);

  React.useEffect(() => {
    setLesson(currentLesson);
  }, [currentLesson]);

  return (
    <LessonContext.Provider
      value={{
        lesson,
        setLesson,
        selectedStepIndex,
        setSelectedStepIndex,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}
