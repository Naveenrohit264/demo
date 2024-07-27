import React, { useState } from 'react';

// StringCalculator class in JavaScript
class StringCalculator {
  static add(numbers) {
    if (!numbers) {
      return 0;
    }

    // Check for custom delimiter
    if (numbers.startsWith("//")) {
      const [delimiter, numString] = StringCalculator._parseCustomDelimiter(numbers);
      return StringCalculator._sumNumbers(numString, delimiter);
    }

    return StringCalculator._sumNumbers(numbers, /,|\n/);
  }

  static _parseCustomDelimiter(numbers) {
    const parts = numbers.split("\n", 2);
    const delimiter = new RegExp(parts[0].substring(2));
    return [delimiter, parts[1]];
  }

  static _sumNumbers(numbers, delimiter) {
    const numList = numbers.split(delimiter).map(num => parseInt(num, 10));
    const negatives = numList.filter(num => num < 0);

    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return numList.reduce((sum, num) => sum + num, 0);
  }
}

// React component to use StringCalculator
const StringCalculatorComponent = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      const sum = StringCalculator.add(input);
      setResult(sum);
      setError(null);
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>String Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleCalculate} style={{ padding: '10px 20px' }}>
        Calculate
      </button>
      {result !== null && <p>Result: {result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StringCalculatorComponent;
