import React from 'react';
import { Grade } from '../utils/gpaCalculations';
import { motion } from 'framer-motion';
import { Input } from './ui/input';

interface CourseEntryProps {
  id: string;
  grade: Grade;
  credits: number;
  courseCode: string;
  onGradeChange: (id: string, grade: Grade) => void;
  onCreditsChange: (id: string, credits: number) => void;
  onCourseCodeChange: (id: string, courseCode: string) => void;
  onRemove: (id: string) => void;
}

const CourseEntry: React.FC<CourseEntryProps> = ({
  id,
  grade,
  credits,
  courseCode,
  onGradeChange,
  onCreditsChange,
  onCourseCodeChange,
  onRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 items-center mb-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <Input
        type="text"
        value={courseCode}
        onChange={(e) => onCourseCodeChange(id, e.target.value)}
        placeholder="Course Code"
        className="w-32"
      />

      <Input
        type="number"
        min="0"
        max="100"
        value={grade}
        onChange={(e) => onGradeChange(id, Number(e.target.value))}
        placeholder="Score (0-100)"
        className="w-32"
      />

      <Input
        type="number"
        min="1"
        max="6"
        value={credits}
        onChange={(e) => onCreditsChange(id, Number(e.target.value))}
        placeholder="Units"
        className="w-24"
      />

      <button
        onClick={() => onRemove(id)}
        className="p-2 text-red-500 hover:text-red-700 transition-colors"
      >
        Remove
      </button>
    </motion.div>
  );
};

export default CourseEntry;