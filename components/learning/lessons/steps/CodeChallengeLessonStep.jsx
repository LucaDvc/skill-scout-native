import { ScrollView, View, useWindowDimensions } from 'react-native';
import React from 'react';
import {
  Button,
  Card,
  Spinner,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import { decode as atob } from 'base-64';
import StepsNavigationButtons from './StepsNavigationButtons';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { findLanguageName } from '../../../../utils/programmingLanguagesUtils';
import RenderHTML from 'react-native-render-html';
import {
  CheckmarkCircle2OutlineIcon,
  CloseCircleOutlineIcon,
  RefreshIcon,
} from '../../../extra/icons';
import { KeyboardAvoidingView } from '../../../layout/KeyboardAvoidingView';
import { useCodeChallenge } from '../../../../hooks/useCodeChallenge';

const CodeChallengeLessonStep = ({ lessonStep }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { width } = useWindowDimensions();

  const [retry, setRetry] = React.useState(false);
  const [language, setLanguage] = React.useState('');
  const [initialCode, setInitialCode] = React.useState('');
  const [code, setCode] = React.useState('');

  const [initializing, setInitializing] = React.useState(true);

  const {
    codeChallengeStep,
    fetchLoading,
    fetchError,
    loading,
    result,
    handleSubmit,
    handleRunCode,
    testRunning,
    testResult,
  } = useCodeChallenge(
    lessonStep.id,
    lessonStep.language_id,
    lessonStep.test_cases[0],
    retry
  );

  React.useEffect(() => {
    if (codeChallengeStep) {
      setInitialCode(atob(codeChallengeStep.submitted_code));
    }
    setInitializing(false);
  }, [codeChallengeStep]);

  React.useEffect(() => {
    setLanguage(findLanguageName(lessonStep.language_id));
    if (lessonStep.initial_code && !codeChallengeStep) {
      const decoded = atob(lessonStep.initial_code);
      setInitialCode(decoded);
    }
  }, [lessonStep.id, codeChallengeStep]);

  if (initializing || fetchLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size='giant' />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.loadingContainer}>
        <Text status='danger'>
          {'An error occurred while fetching the code challenge.'}
        </Text>
        <Button
          appearance='ghost'
          status='basic'
          accessoryLeft={RefreshIcon}
          onPress={() => setRetry(!retry)}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Text category='h6' style={styles.title}>
              {lessonStep.title}
            </Text>
            <RenderHTML contentWidth={width} source={{ html: lessonStep.description }} />
          </View>

          <Text style={{ marginHorizontal: 12, marginTop: 16, marginBottom: 8 }}>
            {language}
          </Text>
          <CodeEditor
            style={{
              ...{
                fontSize: 17,
                inputLineHeight: 23,
                highlighterLineHeight: 23,
                marginTop: 0,
                height: 320,
              },
            }}
            language={language}
            syntaxStyle={CodeEditorSyntaxStyles.atelierCaveLight}
            showLineNumbers
            autoFocus={false}
            initialValue={initialCode}
            readOnly={lessonStep.completed}
            onChange={(newCode) => setCode(newCode)}
          />

          {result && (
            <View
              style={{
                marginHorizontal: 8,
              }}
            >
              <Card
                status={result.passed ? 'success' : 'danger'}
                style={styles.resultCard}
              >
                <View style={styles.resultCardHeader}>
                  {result.passed ? (
                    <>
                      <CheckmarkCircle2OutlineIcon
                        fill={theme['color-success-default']}
                        style={styles.icon}
                      />
                      <Text>Correct answer. Well done!</Text>
                    </>
                  ) : (
                    <>
                      <CloseCircleOutlineIcon
                        fill={theme['color-danger-default']}
                        style={styles.icon}
                      />
                      <Text>Wrong answer. Try again.</Text>
                    </>
                  )}
                </View>
              </Card>
              {!result.passed && (
                <CodeEditor
                  style={{
                    ...{
                      fontSize: 15,
                      height: 200,
                    },
                  }}
                  syntaxStyle={CodeEditorSyntaxStyles.obsidian}
                  autoFocus={false}
                  readOnly
                  initialValue={result.message}
                />
              )}
            </View>
          )}

          {testResult !== null && (
            <View
              style={{
                marginHorizontal: 8,
              }}
            >
              <Card
                status={testResult.passed ? 'success' : 'danger'}
                style={styles.resultCard}
              >
                <View style={styles.resultCardHeader}>
                  {testResult.passed ? (
                    <>
                      <CheckmarkCircle2OutlineIcon
                        fill={theme['color-success-default']}
                        style={styles.icon}
                      />
                      <Text>Passed.</Text>
                    </>
                  ) : (
                    <>
                      <CloseCircleOutlineIcon
                        fill={theme['color-danger-default']}
                        style={styles.icon}
                      />
                      <Text>Failed.</Text>
                    </>
                  )}
                </View>
              </Card>
              <CodeEditor
                style={{
                  ...{
                    fontSize: 15,
                    height: 200,
                  },
                }}
                syntaxStyle={CodeEditorSyntaxStyles.obsidian}
                autoFocus={false}
                readOnly
                initialValue={testResult.message}
              />
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 16,
          }}
        >
          <Button
            appearance={'outline'}
            status={testRunning ? 'info' : 'primary'}
            style={{ backgroundColor: 'transparent' }}
            onPress={() => handleRunCode(code)}
            disabled={testRunning || lessonStep.completed}
            accessoryRight={() => (testRunning ? <Spinner size='small' /> : null)}
          >
            {testRunning ? 'Running' : 'Run code'}
          </Button>
        </View>
        <StepsNavigationButtons
          lessonStep={lessonStep}
          showSubmitButton={!lessonStep.completed || result?.passed}
          onSubmit={() => handleSubmit(code)}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  scrollView: {
    backgroundColor: 'color-basic-100',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  infoContainer: {
    marginHorizontal: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    marginVertical: 16,
  },
  resultCard: {
    marginTop: 16,
    height: 60,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  resultCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CodeChallengeLessonStep;
