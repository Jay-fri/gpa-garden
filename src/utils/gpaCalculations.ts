export type Grade = number; // Represents score out of 100

export interface Course {
  id: string;
  grade: Grade;
  credits: number;
  courseCode: string;
}

const getGradePoints = (score: number): number => {
  if (score >= 70) return 5.0; // A
  if (score >= 60) return 4.0; // B
  if (score >= 50) return 3.0; // C
  if (score >= 45) return 2.0; // D
  return 0.0; // F
};

export const getClassification = (gpa: number): string => {
  if (gpa >= 4.50) return "First Class Honours (1st)";
  if (gpa >= 3.50) return "Second Class Upper (2:1)";
  if (gpa >= 2.50) return "Second Class Lower (2:2)";
  if (gpa >= 1.50) return "Third Class (3rd)";
  return "Fail";
};

export const calculateGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;

  const totalPoints = courses.reduce((sum, course) => {
    return sum + (getGradePoints(course.grade) * course.credits);
  }, 0);

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return Number((totalPoints / totalCredits).toFixed(2));
};