import React from 'react'

interface GenerateBtnProps {
  onGenerate: () => void;
  disabled?: boolean;
  text: string;
}

const GenerateBtn: React.FC<GenerateBtnProps> = ({ onGenerate, disabled, text }) => {
  return (
    <button className="gen-button" onClick={onGenerate} disabled={disabled}>
      <span className="material-icons">download  </span>
      {text}
    </button>
  );
};

export default GenerateBtn;