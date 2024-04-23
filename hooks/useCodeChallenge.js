import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { codeChallengeService } from '../features/learning/codeChallengeService';
import {
  completeLessonStep,
  updateUiOnLessonStepComplete,
} from '../features/learning/learningSlice';
import Toast from 'react-native-root-toast';
import { encode as btoa, decode as atob } from 'base-64';

export const useCodeChallenge = (lessonStepId) => {
  const [submissionToken, setSubmissionToken] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { accessToken } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleSubmit = async (code) => {
    setResult(null);
    setLoading(true);

    if (!code) {
      Toast.show('Please write some code before submitting.', {
        position: Toast.positions.BOTTOM,
      });
      setLoading(false);
      return;
    }

    let base64Code;
    try {
      base64Code = btoa(code);
    } catch (error) {
      console.error('Failed to encode code:', error);
      Toast.show('Invalid input', { position: Toast.positions.BOTTOM });
      return;
    }

    try {
      const response = await codeChallengeService.submitCodeChallenge(
        lessonStepId,
        base64Code,
        accessToken
      );
      setSubmissionToken(response.token);
    } catch (error) {
      console.error('Failed to fetch task token:', error);
      Toast.show('Failed to submit code. Please try again.', {
        position: Toast.positions.BOTTOM,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await codeChallengeService.getSubmissionResult(
          submissionToken,
          accessToken
        );
        const submission = response.submission;
        if (submission.passed) {
          setResult({ passed: true });
          dispatch(updateUiOnLessonStepComplete(lessonStepId));
          dispatch(completeLessonStep(lessonStepId));
        } else {
          if (!submission.error_message) {
            const firstFailedTest = submission.test_results.find((test) => !test.passed);
            const input = atob(firstFailedTest.input);
            const expectedOutput = atob(firstFailedTest.expected_output);
            const actualOutput = firstFailedTest.stdout && atob(firstFailedTest.stdout);
            setResult({
              passed: false,
              message: `Test case failed.\nInput: ${input}\nExpected output: ${expectedOutput}\nGot: ${actualOutput}`,
            });
          } else {
            const testWithError = submission.test_results.find(
              (test) => test.compile_err || test.stderr
            );
            const errorMessageBase64 = testWithError.compile_err || testWithError.stderr;
            const errorMessage = atob(errorMessageBase64);
            setResult({
              passed: false,
              message: `${testWithError.status}\nInput: ${atob(
                testWithError.input
              )}\nError:\n${errorMessage}`,
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch submission result:', error);
        Toast.show('Failed to fetch submission result. Please try again.', {
          position: Toast.positions.BOTTOM,
        });
      } finally {
        setLoading(false);
      }
    };

    if (submissionToken) {
      fetchResult();
    }
  }, [submissionToken]);

  return {
    loading,
    result,
    handleSubmit,
  };
};
