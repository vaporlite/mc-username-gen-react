import React from 'react'

interface GenerateBtnProps {
  onGenerate: () => void;
}

const GenerateBtn: React.FC<GenerateBtnProps> = ({ onGenerate }) => {
  return (
    <button className="gen-button" onClick={onGenerate}>
      generate usernames
    </button>
  );
};

export default GenerateBtn;