import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  completeLessonStep,
  updateUiOnLessonStepComplete,
} from '../features/learning/learningSlice';
import Toast from 'react-native-root-toast';
import { textProblemService } from '../features/learning/textProblemService';

export const useTextProblem = (lessonStepId, retry) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [textProblem, setTextProblem] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const [result, setResult] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { accessToken } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTextProblem = async () => {
      try {
        setFetchLoading(true);
        setFetchError(false);
        const response = await textProblemService.getTextProblem(
          lessonStepId,
          accessToken
        );
        setTextProblem(response);
      } catch (error) {
        console.error('Failed to fetch text problem:', error);
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchTextProblem();
  }, [lessonStepId, retry]);

  const handleSubmit = async (answer) => {
    setSubmitLoading(true);
    setResult(null);

    if (!answer) {
      setSubmitLoading(false);
      Toast.show('Please enter an answer.', {
        position: Toast.positions.BOTTOM,
      });
      return;
    }

    try {
      const response = await textProblemService.submitTextProblem(
        lessonStepId,
        { answer },
        accessToken
      );
      setResult({ passed: response.detail === 'Correct answer' });
      if (response.detail === 'Correct answer') {
        dispatch(completeLessonStep(lessonStepId));
        dispatch(updateUiOnLessonStepComplete(lessonStepId));
      }
    } catch (error) {
      console.log(error.response.data);
      console.error('Failed to submit text problem:', error);
      Toast.show('Failed to submit text problem. Please try again.', {
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    textProblem,
    fetchLoading,
    fetchError,
    handleSubmit,
    submitLoading,
    result,
  };
};
