import { ScrollView, View, useWindowDimensions } from 'react-native';
import React from 'react';
import {
  Button,
  Card,
  Input,
  Spinner,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {
  CheckmarkCircle2OutlineIcon,
  CloseCircleOutlineIcon,
  RefreshIcon,
} from '../../../extra/icons';
import RenderHTML from 'react-native-render-html';
import StepsNavigationButtons from './StepsNavigationButtons';
import { KeyboardAvoidingView } from '../../../layout/KeyboardAvoidingView';
import { useTextProblem } from '../../../../hooks/useTextProblem';

const TextProblemStep = ({ lessonStep }) => {
  const { width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const [answer, setAnswer] = React.useState('');
  const [retry, setRetry] = React.useState(false);

  const { textProblem, fetchLoading, fetchError, handleSubmit, submitLoading, result } =
    useTextProblem(lessonStep.id, retry);

  if (fetchLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size='giant' />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.loadingContainer}>
        <Text status='danger'>{'An error occurred while fetching the quiz.'}</Text>
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
          <Text category='h6' style={{ marginVertical: 16 }}>
            {textProblem.title}
          </Text>

          <RenderHTML contentWidth={width} source={{ html: textProblem.statement }} />

          <View style={styles.quizContainer}>
            <View style={styles.answersContainer}>
              <Input
                label='Answer'
                value={answer}
                onChangeText={setAnswer}
                textStyle={{
                  minHeight: 64,
                  textAlignVertical: 'top',
                }}
                multiline
                placeholder='Type your answer here...'
                disabled={lessonStep.completed}
              />
            </View>

            {lessonStep.completed || result ? (
              <View>
                <Card
                  status={result?.passed || lessonStep.completed ? 'success' : 'danger'}
                  style={styles.card}
                >
                  <View style={styles.resultCardHeader}>
                    {result?.passed || lessonStep.completed ? (
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
              </View>
            ) : null}
          </View>
        </View>

        <StepsNavigationButtons
          lessonStep={lessonStep}
          showSubmitButton={!lessonStep.completed}
          loading={submitLoading}
          onSubmit={() => handleSubmit(answer)}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'color-basic-100',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 12,
  },
  answersContainer: {
    marginVertical: 16,
  },
  quizContainer: {
    justifyContent: 'space-between',
    flex: 1,
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
  card: {
    marginVertical: 16,
  },
});

export default TextProblemStep;
