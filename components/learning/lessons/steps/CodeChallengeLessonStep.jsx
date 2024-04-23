import { ScrollView, View, useWindowDimensions } from 'react-native';
import React from 'react';
import {
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
} from '../../../extra/icons';
import { KeyboardAvoidingView } from '../../../layout/KeyboardAvoidingView';
import { useCodeChallenge } from '../../../../hooks/useCodeChallenge';

const CodeChallengeLessonStep = ({ lessonStep }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { width } = useWindowDimensions();

  const { loading, result, handleSubmit } = useCodeChallenge(lessonStep.id);

  const [language, setLanguage] = React.useState('');
  const [initialCode, setInitialCode] = React.useState('');
  const [code, setCode] = React.useState('');

  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    setLanguage(findLanguageName(lessonStep.language_id));
    if (lessonStep.initial_code) {
      const decoded = atob(lessonStep.initial_code);
      setInitialCode(decoded);
      setInitializing(false);
    }
  }, [lessonStep.id]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size='giant' />
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
                  syntaxStyle={CodeEditorSyntaxStyles.atelierCaveLight}
                  autoFocus={false}
                  readOnly
                  initialValue={result.message}
                />
              )}
            </View>
          )}
        </View>
        <StepsNavigationButtons
          lessonStep={lessonStep}
          showSubmitButton={true}
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
