import SearchResultCourseCard from '../components/course-cards/SearchResultCourseCard';
import SearchEnrolledCourseCard from '../components/course-cards/SearchEnrolledCourseCard';

export const renderSearchedCourse = ({ item }) =>
  item.is_enrolled ? (
    <SearchEnrolledCourseCard course={item} />
  ) : (
    <SearchResultCourseCard course={item} />
  );
