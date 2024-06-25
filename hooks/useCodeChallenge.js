import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { codeChallengeService } from '../features/learning/codeChallengeService';
import {
  completeLessonStep,
  updateUiOnLessonStepComplete,
} from '../features/learning/learningSlice';
import Toast from 'react-native-root-toast';
import { encode as btoa, decode as atob } from 'base-64';

export const useCodeChallenge = (lessonStepId, languageId, firstTestCase, retry) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [codeChallengeStep, setCodeChallengeStep] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const [submissionToken, setSubmissionToken] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [failedTestCase, setFailedTestCase] = useState(firstTestCase);
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const { accessToken } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCodeChallenge = async () => {
      try {
        setFetchLoading(true);
        setFetchError(false);
        const response = await codeChallengeService.getCodeChallenge(
          lessonStepId,
          accessToken
        );
        setCodeChallengeStep(response);
      } catch (error) {
        console.error('Failed to fetch code challenge step:', error);
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCodeChallenge();
  }, [lessonStepId, retry]);

  const handleSubmit = async (code) => {
    setResult(null);
    setLoading(true);
    setTestResult(null);

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
          accessToken,
          20
        );
        const submission = response.submission;
        if (submission.passed) {
          setResult({ passed: true });
          dispatch(updateUiOnLessonStepComplete(lessonStepId));
          dispatch(completeLessonStep(lessonStepId));
        } else {
          if (!submission.error_message) {
            const firstFailedTest = submission.test_results.find((test) => !test.passed);
            setFailedTestCase(firstFailedTest);
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
            setFailedTestCase(testWithError);
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

  const handleRunCode = async (code) => {
    setTestRunning(true);
    if (!code) {
      Toast.show('Please write some code before submitting.', {
        position: Toast.positions.BOTTOM,
      });
      setTestRunning(false);
      return;
    }

    try {
      const response = await codeChallengeService.runCode(
        btoa(code),
        failedTestCase,
        languageId
      );

      if (response.status.description === 'Accepted') {
        setTestResult({
          passed: true,
          message: `Test case passed.\n\nInput: ${atob(
            failedTestCase.input
          )}\n\nOutput: \n${atob(response.stdout)}`,
        });
      } else if (response.status.description === 'Wrong Answer') {
        setTestResult({
          passed: false,
          message: `Test case failed.\n\nInput: ${atob(
            failedTestCase.input
          )}\n\nExpected output: ${atob(
            failedTestCase.expected_output
          )}\n\nYour code output: \n${atob(response.stdout)}`,
        });
      } else {
        setTestResult({
          passed: false,
          message: `Test case failed.\n\nInput: ${atob(
            failedTestCase.input
          )}\n\nError: ${atob(response.stderr || response.compile_output)}`,
        });
      }
    } catch (error) {
      console.error('Failed to run code:', error);
      Toast.show('Failed to run code. Please try again.', {
        position: Toast.positions.BOTTOM,
      });
    }
    setTestRunning(false);
  };

  return {
    codeChallengeStep,
    fetchLoading,
    fetchError,

    loading,
    result,
    handleSubmit,

    testRunning,
    failedTestCase,
    handleRunCode,
    testResult,
  };
};
