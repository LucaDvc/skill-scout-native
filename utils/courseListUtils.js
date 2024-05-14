import SearchResultCourseCard from '../components/course-cards/SearchResultCourseCard';
import SearchEnrolledCourseCard from '../components/course-cards/SearchEnrolledCourseCard';

export const renderSearchedCourse = ({ item }) =>
  item.is_enrolled ? (
    <SearchEnrolledCourseCard course={item} />
  ) : (
    <SearchResultCourseCard course={item} />
  );

export const pairUpCourses = (courses, viewMore) => {
  const pairedCourses = [];
  for (let i = 0; i < courses.length; i += 2) {
    pairedCourses.push({
      course1: courses[i],
      course2: courses[i + 1] ? courses[i + 1] : null,
    });
  }

  if (viewMore && courses.length % 2 === 0) {
    pairedCourses.push({ course1: null, course2: 'ignore' });
  }

  return pairedCourses;
};
