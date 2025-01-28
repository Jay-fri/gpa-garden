import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseEntry from './CourseEntry';
import { Course, Grade, calculateGPA, getClassification } from '@/utils/gpaCalculations';
import { useToast } from '@/components/ui/use-toast';

const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showGPA, setShowGPA] = useState(false);
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const addCourse = () => {
    setShowGPA(false);
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      grade: 0,
      credits: 3,
      courseCode: '',
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setShowGPA(false);
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateGrade = (id: string, grade: Grade) => {
    setShowGPA(false);
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
    setShowGPA(false);
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
    setShowGPA(false);
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

    // Scroll to result after a short delay to ensure the element is rendered
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const gpa = calculateGPA(courses);
  const classification = getClassification(gpa);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#1A1F2C] to-[#2D3748] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />
        
        <div className="relative text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-full mb-4">
            Calculator
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            GPA Calculator
          </h1>
          <p className="text-gray-300">Add your courses to calculate your GPA</p>
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={addCourse}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto"
          >
            Add Course
          </button>
          {courses.length > 0 && (
            <>
              <button
                onClick={handleCalculateGPA}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
              >
                Calculate GPA
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 w-full sm:w-auto"
              >
                Clear All
              </button>
            </>
          )}
        </div>

        {showGPA && courses.length > 0 && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 text-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50"
          >
            <div className="text-7xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              {gpa}
            </div>
            <div className="text-gray-400 mt-2 text-lg">Cumulative GPA</div>
            <div className="text-xl sm:text-2xl font-semibold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {classification}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GpaCalculator;