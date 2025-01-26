import React from 'react';
import { Grade, gradePoints } from '@/utils/gpaCalculations';
import { motion } from 'framer-motion';

interface CourseEntryProps {
  id: string;
  grade: Grade;
  credits: number;
  onGradeChange: (id: string, grade: Grade) => void;
  onCreditsChange: (id: string, credits: number) => void;
  onRemove: (id: string) => void;
}

const CourseEntry: React.FC<CourseEntryProps> = ({
  id,
  grade,
  credits,
  onGradeChange,
  onCreditsChange,
  onRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 items-center mb-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <select
        value={grade}
        onChange={(e) => onGradeChange(id, e.target.value as Grade)}
        className="p-2 border rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        {Object.keys(gradePoints).map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="6"
        value={credits}
        onChange={(e) => onCreditsChange(id, Number(e.target.value))}
        className="p-2 border rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-gray-200"
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