import {
  ScrollView,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
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
import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  CheckmarkCircle2OutlineIcon,
  CloseCircleOutlineIcon,
  RefreshIcon,
} from '../../../extra/icons';
import { useSortingProblem } from '../../../../hooks/useSortingProblem';
import RenderHTML from 'react-native-render-html';
import StepsNavigationButtons from './StepsNavigationButtons';

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const SortingProblemStep = ({ lessonStep }) => {
  const { width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const [options, setOptions] = React.useState(shuffle([...lessonStep.options]));
  const [retry, setRetry] = React.useState(false);

  const {
    sortingProblem,
    fetchLoading,
    fetchError,
    handleSubmit,
    submitLoading,
    result,
  } = useSortingProblem(lessonStep.id, retry);

  React.useEffect(() => {
    if (sortingProblem && lessonStep.completed) {
      setOptions([...sortingProblem.options]);
    }
  }, [sortingProblem]);

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

  const moveOption = (index, direction) => {
    const newOptions = [...options];
    const newIndex = index + direction;

    // Check if the new index is within bounds
    if (newIndex >= 0 && newIndex < newOptions.length) {
      // Swap the options
      const temp = newOptions[newIndex];
      newOptions[newIndex] = newOptions[index];
      newOptions[index] = temp;

      setOptions(newOptions);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.contentContainer}>
        <Text category='h6' style={{ marginVertical: 16 }}>
          {sortingProblem.title}
        </Text>

        <RenderHTML contentWidth={width} source={{ html: sortingProblem.statement }} />

        <View style={styles.quizContainer}>
          <View style={styles.answersContainer}>
            {options.map((option, index) => (
              <View style={styles.optionCard} key={option.id}>
                <Text>{option.text}</Text>
                <View>
                  <Pressable
                    onPress={() => moveOption(index, -1)}
                    style={{ marginBottom: 4 }}
                    disabled={index === 0 || lessonStep.completed}
                  >
                    <ArrowUpwardIcon
                      width={24}
                      height={24}
                      fill={(index === 0 || lessonStep.completed) && 'lightgray'}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => moveOption(index, 1)}
                    disabled={index === options.length - 1 || lessonStep.completed}
                  >
                    <ArrowDownwardIcon
                      width={24}
                      height={24}
                      fill={
                        (index === options.length - 1 || lessonStep.completed) &&
                        'lightgray'
                      }
                    />
                  </Pressable>
                </View>
              </View>
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
            </View>
          ) : null}
        </View>
      </View>

      <StepsNavigationButtons
        lessonStep={lessonStep}
        showSubmitButton={!lessonStep.completed}
        loading={submitLoading}
        onSubmit={() => handleSubmit(options)}
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
  optionCard: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SortingProblemStep;
