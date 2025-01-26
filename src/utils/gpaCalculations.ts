export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface Course {
  id: string;
  grade: Grade;
  credits: number;
}

export const gradePoints: Record<Grade, number> = {
  'A': 4.0,
  'B': 3.0,
  'C': 2.0,
  'D': 1.0,
  'F': 0.0,
};

export const calculateGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;

  const totalPoints = courses.reduce((sum, course) => {
    return sum + (gradePoints[course.grade] * course.credits);
  }, 0);

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return Number((totalPoints / totalCredits).toFixed(2));
};