//components\Form\DescribeIcon.tsx
import React from 'react';

const DescribeIcon: React.FC = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <input
        className="rounded-sm p-2 border-2 border-indigo-200 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none transition duration-200 ease-in-out"
        type="text"
        name="noun"
        placeholder="Noun (e.g., robot)"
      />
      <input
        className="rounded-sm p-2 border-2 border-indigo-200 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none transition duration-200 ease-in-out"
        type="text"
        name="adjective"
        placeholder="Adjective (e.g., happy)"
      />
    </div>
  );
};

export default DescribeIcon;
