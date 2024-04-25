import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  completeLessonStep,
  updateUiOnLessonStepComplete,
} from '../features/learning/learningSlice';
import Toast from 'react-native-root-toast';
import { quizService } from '../features/learning/quizService';

export const useQuiz = (lessonStepId, retry) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [quizStep, setQuizStep] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const [result, setResult] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { accessToken } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizStep = async () => {
      try {
        setFetchLoading(true);
        setFetchError(false);
        const response = await quizService.getQuizStep(lessonStepId, accessToken);
        setQuizStep(response);
      } catch (error) {
        console.error('Failed to fetch quiz step:', error);
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchQuizStep();
  }, [lessonStepId, retry]);

  const handleSubmit = async (checkedChoices) => {
    setSubmitLoading(true);
    setResult(null);
    const choiceIds = Object.keys(checkedChoices).filter((key) => checkedChoices[key]);
    try {
      const response = await quizService.submitQuiz(lessonStepId, choiceIds, accessToken);
      setResult({ passed: response.detail === 'Correct answer' });
      if (response.detail === 'Correct answer') {
        dispatch(completeLessonStep(lessonStepId));
        dispatch(updateUiOnLessonStepComplete(lessonStepId));
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      Toast.show('Failed to submit quiz. Please try again.', {
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return { quizStep, fetchLoading, fetchError, handleSubmit, submitLoading, result };
};
