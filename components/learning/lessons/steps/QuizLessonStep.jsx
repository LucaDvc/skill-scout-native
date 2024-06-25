import { ScrollView, View, useWindowDimensions } from 'react-native';
import React from 'react';
import {
  Button,
  Card,
  CheckBox,
  Spinner,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import RenderHTML from 'react-native-render-html';
import StepsNavigationButtons from './StepsNavigationButtons';
import { useQuiz } from '../../../../hooks/useQuiz';
import {
  CheckmarkCircle2OutlineIcon,
  CloseCircleOutlineIcon,
  InfoOutlineIcon,
  RefreshIcon,
} from '../../../extra/icons';

const QuizLessonStep = ({ lessonStep }) => {
  const { width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const [choicesChecked, setChoicesChecked] = React.useState({});
  const [retry, setRetry] = React.useState(false);

  const { quizStep, fetchLoading, fetchError, handleSubmit, submitLoading, result } =
    useQuiz(lessonStep.id, retry);

  React.useEffect(() => {
    if (quizStep) {
      setChoicesChecked(
        quizStep.quiz_choices.reduce(
          (acc, choice) => ({ ...acc, [choice.id]: choice.correct }),
          {}
        )
      );
    }
  }, [quizStep]);

  const handleChoiceChange = (choiceId) => {
    if (!lessonStep.multiple_choice) {
      setChoicesChecked((prev) =>
        Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: key === choiceId }), {})
      );
    } else {
      setChoicesChecked((prev) => ({ ...prev, [choiceId]: !prev[choiceId] }));
    }
  };

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
      <View style={styles.contentContainer}>
        <Text category='h6' style={{ marginVertical: 16 }}>
          Quiz
        </Text>
        <RenderHTML contentWidth={width} source={{ html: quizStep.question }} />

        <View style={styles.quizContainer}>
          <View style={styles.answersContainer}>
            {quizStep.quiz_choices.map((choice) => (
              <CheckBox
                key={choice.id}
                checked={choicesChecked[choice.id]}
                onChange={() => handleChoiceChange(choice.id)}
                disabled={lessonStep.completed}
                style={{ marginVertical: 5 }}
              >
                <Text>{choice.text}</Text>
              </CheckBox>
            ))}
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
              {lessonStep.completed || result?.passed ? (
                <Card status='info' style={styles.card}>
                  <View style={styles.resultCardHeader}>
                    <InfoOutlineIcon
                      fill={theme['color-info-default']}
                      style={styles.icon}
                    />
                    <Text>Explanation</Text>
                  </View>
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: quizStep.explanation }}
                  />
                </Card>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>

      <StepsNavigationButtons
        lessonStep={lessonStep}
        showSubmitButton={!lessonStep.completed}
        loading={submitLoading}
        onSubmit={() => handleSubmit(choicesChecked)}
      />
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

export default QuizLessonStep;
