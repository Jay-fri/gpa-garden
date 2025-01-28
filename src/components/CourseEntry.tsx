import React from "react";
import { Grade } from "../utils/gpaCalculations";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
      className="flex flex-col sm:flex-row gap-4 items-start sm:items-end mb-4 p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg"
    >
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <Label htmlFor={`courseCode-${id}`} className="text-gray-300">
          Course Code
        </Label>
        <Input
          id={`courseCode-${id}`}
          type="text"
          value={courseCode}
          onChange={(e) => onCourseCodeChange(id, e.target.value.toUpperCase())}
          placeholder="e.g., CSC101"
          className="w-full sm:w-32 uppercase bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <Label htmlFor={`grade-${id}`} className="text-gray-300">
          Score (0-100)
        </Label>
        <Input
          id={`grade-${id}`}
          type="number"
          min="0"
          max="100"
          value={grade || ""}
          onChange={(e) => onGradeChange(id, Number(e.target.value))}
          placeholder="Score"
          className="w-full sm:w-32 bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <Label htmlFor={`credits-${id}`} className="text-gray-300">
          Course Units
        </Label>
        <Select
          value={credits.toString()}
          onValueChange={(value) => onCreditsChange(id, Number(value))}
        >
          <SelectTrigger className="w-full sm:w-24 bg-gray-800/50 border-gray-700 text-gray-200">
            <SelectValue placeholder="Units" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        onClick={() => onRemove(id)}
        className="p-2 text-red-400 hover:text-red-300 transition-colors w-full sm:w-auto mt-4 sm:mt-0 hover:scale-110 duration-200"
        aria-label="Remove course"
      >
        <Trash2 size={20} />
      </button>
    </motion.div>
  );
};

export default CourseEntry;
