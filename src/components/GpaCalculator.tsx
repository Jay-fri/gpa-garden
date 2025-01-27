import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseEntry from './CourseEntry';
import { Course, Grade, calculateGPA } from '@/utils/gpaCalculations';
import { useToast } from '@/components/ui/use-toast';

const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showGPA, setShowGPA] = useState(false);
  const { toast } = useToast();

  const addCourse = () => {
    setShowGPA(false); // Hide GPA when adding new course
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      grade: 0,
      credits: 3,
      courseCode: '',
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setShowGPA(false); // Hide GPA when removing course
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateGrade = (id: string, grade: Grade) => {
    setShowGPA(false); // Hide GPA when updating grade
    if (grade < 0 || grade > 100) {
      toast({
        title: "Invalid Score",
        description: "Score must be between 0 and 100",
        variant: "destructive",
      });
      return;
    }
    setCourses(courses.map(course => 
      course.id === id ? { ...course, grade } : course
    ));
  };

  const updateCredits = (id: string, credits: number) => {
    setShowGPA(false); // Hide GPA when updating credits
    if (credits < 1 || credits > 6) {
      toast({
        title: "Invalid Units",
        description: "Units must be between 1 and 6",
        variant: "destructive",
      });
      return;
    }
    setCourses(courses.map(course => 
      course.id === id ? { ...course, credits } : course
    ));
  };

  const updateCourseCode = (id: string, courseCode: string) => {
    setShowGPA(false); // Hide GPA when updating course code
    setCourses(courses.map(course => 
      course.id === id ? { ...course, courseCode } : course
    ));
  };

  const clearAll = () => {
    setCourses([]);
    setShowGPA(false);
    toast({
      title: "Cleared",
      description: "All courses have been removed",
    });
  };

  const handleCalculateGPA = () => {
    if (courses.length === 0) {
      toast({
        title: "No Courses",
        description: "Please add at least one course to calculate GPA",
        variant: "destructive",
      });
      return;
    }
    
    // Check if all required fields are filled
    const hasEmptyCourses = courses.some(course => 
      course.courseCode.trim() === '' || 
      course.grade === 0 || 
      course.credits === 0
    );

    if (hasEmptyCourses) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all course details before calculating GPA",
        variant: "destructive",
      });
      return;
    }

    setShowGPA(true);
    toast({
      title: "GPA Calculated",
      description: "Your GPA has been calculated based on your course inputs",
    });
  };

  const gpa = calculateGPA(courses);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Calculator
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-2">GPA Calculator</h1>
          <p className="text-gray-600">Add your courses to calculate your GPA</p>
        </div>

        <AnimatePresence>
          {courses.map((course) => (
            <CourseEntry
              key={course.id}
              {...course}
              onGradeChange={updateGrade}
              onCreditsChange={updateCredits}
              onCourseCodeChange={updateCourseCode}
              onRemove={removeCourse}
            />
          ))}
        </AnimatePresence>

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={addCourse}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add Course
          </button>
          {courses.length > 0 && (
            <>
              <button
                onClick={handleCalculateGPA}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Calculate GPA
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            </>
          )}
        </div>

        {showGPA && courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <div className="text-6xl font-bold">{gpa}</div>
            <div className="text-gray-500 mt-2">Cumulative GPA</div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GpaCalculator;