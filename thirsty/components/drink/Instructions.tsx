import React from "react";

interface InstructionsProps {
  instructions: string;
  glass?: string;
}

const Instructions: React.FC<InstructionsProps> = ({ instructions, glass }) => {
  return (
    <div className="mt-7.5 px-5 mb-5 text-[17px] leading-relaxed">
      <h3 className="mb-2 font-bold">Instructions</h3>
      {glass && (
        <p>
          <strong>Glass:</strong> {glass}
        </p>
      )}
      <p>{instructions}</p>
    </div>
  );
};

export default Instructions;
