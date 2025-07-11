
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MathCaptchaProps {
  onVerify: (isValid: boolean) => void;
  isVerified: boolean;
}

const MathCaptcha = ({ onVerify, isVerified }: MathCaptchaProps) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    
    let answer = 0;
    switch (op) {
      case '+':
        answer = n1 + n2;
        break;
      case '-':
        answer = n1 - n2;
        break;
      case '*':
        answer = n1 * n2;
        break;
    }
    
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setCorrectAnswer(answer);
    setUserAnswer('');
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    onVerify(isCorrect);
    if (!isCorrect) {
      generateCaptcha();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 border-2 border-blue-200">
      <h4 className="font-bold text-purple-700 mb-3 text-center">
        🔐 Security Verification
      </h4>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="text-2xl font-bold text-purple-800">
          {num1} {operator} {num2} = ?
        </span>
      </div>
      <div className="flex gap-2">
        <Input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter answer"
          className="funky-input flex-1"
          disabled={isVerified}
        />
        <Button
          onClick={handleVerify}
          disabled={!userAnswer || isVerified}
          className="funky-button"
        >
          {isVerified ? "✅ Verified" : "Verify"}
        </Button>
      </div>
      {isVerified && (
        <p className="text-green-600 text-center mt-2 font-semibold">
          ✅ Verification successful!
        </p>
      )}
    </div>
  );
};

export default MathCaptcha;
