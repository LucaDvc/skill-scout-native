import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  completeLessonStep,
  updateUiOnLessonStepComplete,
} from '../features/learning/learningSlice';
import Toast from 'react-native-root-toast';
import { sortingProblemService } from '../features/learning/sortingProblemService';

export const useSortingProblem = (lessonStepId, retry) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [sortingProblem, setSortingProblem] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const [result, setResult] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { accessToken } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSortingProblem = async () => {
      try {
        setFetchLoading(true);
        setFetchError(false);
        const response = await sortingProblemService.getSortingProblem(
          lessonStepId,
          accessToken
        );
        setSortingProblem(response);
      } catch (error) {
        console.error('Failed to fetch sorting problem:', error);
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchSortingProblem();
  }, [lessonStepId, retry]);

  const handleSubmit = async (options) => {
    setSubmitLoading(true);
    setResult(null);
    const request = { ordered_options: options.map((option) => option.id) };
    try {
      const response = await sortingProblemService.submitSortingProblem(
        lessonStepId,
        request,
        accessToken
      );
      setResult({ passed: response.detail === 'Correct answer' });
      if (response.detail === 'Correct answer') {
        dispatch(completeLessonStep(lessonStepId));
        dispatch(updateUiOnLessonStepComplete(lessonStepId));
      }
    } catch (error) {
      console.log(error.response.data);
      console.error('Failed to submit sorting problem:', error);
      Toast.show('Failed to submit sorting problem. Please try again.', {
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    sortingProblem,
    fetchLoading,
    fetchError,
    handleSubmit,
    submitLoading,
    result,
  };
};
