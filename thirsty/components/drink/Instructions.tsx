import React from "react";

interface InstructionsProps {
  drink: {
    instructions: string;
    glass?: string;
  };
}

const Instructions: React.FC<InstructionsProps> = ({ drink }) => {
  const { instructions, glass } = drink;
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
