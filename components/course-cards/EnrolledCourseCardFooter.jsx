import { Button } from '@ui-kitten/components';
import { router } from 'expo-router';
import { ArrowRightIcon } from '../extra/icons';

const Footer = ({ course }) => {
  const handleContinueCourse = () => {
    const lastStoppedLessonId =
      course.learner_progress.last_stopped_lesson ?? course.chapters[0].lessons[0].id;
    const lastStoppedStepId =
      course.learner_progress.last_stopped_step ??
      course.chapters[0].lessons[0].lesson_steps[0].id;
    router.navigate(
      `/learning/${course.id}/lessons/${lastStoppedLessonId}?lessonStepId=${lastStoppedStepId}`
    );
  };

  return (
    <Button
      appearance='ghost'
      accessoryLeft={ArrowRightIcon}
      onPress={handleContinueCourse}
    >
      Continue Learning
    </Button>
  );
};

export default Footer;
