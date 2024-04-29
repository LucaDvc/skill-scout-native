import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import learningService from './learningService';

const initialState = {
  courses: [],
  course: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getCourses = createAsyncThunk('learning/getCourses', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().users.accessToken;
    return await learningService.getCourses(token);
  } catch (error) {
    console.error(error);
    let message = error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getCourseById = createAsyncThunk(
  'learning/getCourseById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await learningService.getCourseById(id, token);
    } catch (error) {
      let message;
      if (error.response.status === 404) {
        message = 'Not found';
      } else {
        message = error.message || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const completeLessonStep = createAsyncThunk(
  'learning/completeLessonStep',
  async (lessonStepId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await learningService.completeLessonStep(lessonStepId, token);
    } catch (error) {
      console.error(error);
      let message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.courses = [];
      state.course = {};
    },
    statusesReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    updateUiOnLessonStepComplete: (state, action) => {
      const lessonStepId = action.payload;

      state.course = {
        ...state.course,
        chapters: state.course.chapters.map((chapter) => ({
          ...chapter,
          lessons: chapter.lessons.map((lesson) => {
            // Update lesson step
            const updatedLessonSteps = lesson.lesson_steps.map((step) => {
              if (step.id === lessonStepId) {
                return { ...step, completed: true };
              }
              return step;
            });

            // Check if all steps are completed
            const isLessonCompleted = updatedLessonSteps.every((step) => step.completed);

            if (
              isLessonCompleted &&
              !state.course.learner_progress.completed_lessons.includes(lesson.id)
            ) {
              state.course.learner_progress.completed_lessons.push(lesson.id);
            }

            // Return the updated lesson object
            return {
              ...lesson,
              completed: isLessonCompleted,
              lesson_steps: updatedLessonSteps,
            };
          }),
        })),
      };

      state.course.learner_progress.last_stopped_step = lessonStepId;
      state.course.learner_progress.completed_steps.push(lessonStepId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCourseById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default learningSlice.reducer;

export const { reset, statusesReset, updateUiOnLessonStepComplete } =
  learningSlice.actions;
