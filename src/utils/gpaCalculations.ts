export type Grade = number; // Now represents score out of 100

export interface Course {
  id: string;
  grade: Grade;
  credits: number;
  courseCode: string;
}

const getGradePoints = (score: number): number => {
  if (score >= 90) return 4.0;
  if (score >= 80) return 3.0;
  if (score >= 70) return 2.0;
  if (score >= 60) return 1.0;
  return 0.0;
};

export const calculateGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;

  const totalPoints = courses.reduce((sum, course) => {
    return sum + (getGradePoints(course.grade) * course.credits);
  }, 0);

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return Number((totalPoints / totalCredits).toFixed(2));
};