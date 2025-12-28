import React from 'react';

interface InstructionsProps {
  instructions: string;
  glass?: string;
}

const Instructions: React.FC<InstructionsProps> = ({ instructions, glass }) => {
  return (
    <div>
      <h3>Instructions</h3>
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
