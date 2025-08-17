import { useState } from "react";

const App = () => {
  const [primaryInputNumber, setPrimaryInputNumber] = useState([]);
  const [secondaryInputNumber, setSecondaryInputNumber] = useState([]);
  const [operator, setOperator] = useState("");
  const [error, setError] = useState(null);

  const MAX_DIGITS = 15;

  const handleInputNumber = (input) => {
    setError(null);

    const currentNumber = operator ? secondaryInputNumber : primaryInputNumber;

    // Prevent multiple decimals
    if (input === "." && currentNumber.includes(".")) {
      return;
    }

    // Prevent leading zeros (only if not decimal)
    if (input === "0" && currentNumber.length === 0) {
      return;
    }

    // Check max length
    if (currentNumber.length >= MAX_DIGITS) {
      setError("Maximum digits reached");
      return;
    }

    if (operator) {
      setSecondaryInputNumber((prev) => [...prev, input.toString()]);
    } else {
      setPrimaryInputNumber((prev) => [...prev, input.toString()]);
    }
  };

  const handleOperator = (op) => {
    setError(null);

    // If no primary number exists
    if (primaryInputNumber.length === 0) {
      setError("Please enter a number first");
      return;
    }

    // If there's a secondary number, calculate first
    if (secondaryInputNumber.length > 0) {
      handleCalculation("operator");
    }

    setOperator(op);
  };

  const handleCalculation = (triggeredBy) => {
    setError(null);

    // Check if we have both numbers and an operator
    if (
      !operator ||
      primaryInputNumber.length === 0 ||
      (secondaryInputNumber.length === 0 && triggeredBy !== "operator")
    ) {
      setError("Incomplete calculation");
      return;
    }

    // Handle division by zero
    if (
      (secondaryInputNumber.length === 0 ||
        parseFloat(secondaryInputNumber.join("")) === 0) &&
      operator === "/"
    ) {
      setError("Cannot divide by zero");
      return;
    }

    const num1 = parseFloat(primaryInputNumber.join(""));
    const num2 =
      secondaryInputNumber.length > 0
        ? parseFloat(secondaryInputNumber.join(""))
        : num1;

    let result;
    try {
      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "×":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
        default:
          setError("Invalid operator");
          return;
      }

      // Handle very large/small numbers
      if (!isFinite(result)) {
        setError("Result is too large/small");
        return;
      }

      // Format result to avoid long decimals
      const formattedResult = parseFloat(result.toFixed(10))
        .toString()
        .split("");

      setPrimaryInputNumber(formattedResult);
      setSecondaryInputNumber([]);
      setOperator("");
    } catch (err) {
      setError("Calculation error");
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Calculator Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
            {/* Display Section */}
            <div className="bg-[#1f2937] text-white h-[100px] px-5 pt-5">
              <div className="text-right">
                <div className="text-4xl font-bold leading-tight break-words">
                  {primaryInputNumber.length > 0 &&
                  secondaryInputNumber.length === 0
                    ? primaryInputNumber.join("")
                    : primaryInputNumber.length > 0 &&
                      secondaryInputNumber.length > 0
                    ? secondaryInputNumber.join("")
                    : 0}
                </div>
                {operator && (
                  <p className="text-xs opacity-75 mt-1">
                    {primaryInputNumber.join("")}
                    {operator}
                  </p>
                )}
              </div>
            </div>

            {/* Button Grid */}
            <div className="p-4 bg-white">
              <div className="grid grid-cols-4 gap-3">
                {/* Row 1 */}
                <button
                  onClick={() => {
                    setPrimaryInputNumber([]);
                    setSecondaryInputNumber([]);
                    setOperator("");
                    setError(null);
                  }}
                  className="col-span-2 bg-red-500 text-white h-14 text-lg font-semibold rounded-xl flex items-center justify-center hover:bg-red-600 cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={() => handleOperator("/")}
                  className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer"
                >
                  ÷
                </button>
                <button
                  onClick={() => handleOperator("×")}
                  className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer"
                >
                  ×
                </button>

                {/* Row 2 */}
                <button
                  onClick={() => handleInputNumber("7")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  7
                </button>
                <button
                  onClick={() => handleInputNumber("8")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  8
                </button>
                <button
                  onClick={() => handleInputNumber("9")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  9
                </button>
                <button
                  onClick={() => handleOperator("-")}
                  className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer"
                >
                  −
                </button>

                {/* Row 3 */}
                <button
                  onClick={() => handleInputNumber("4")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  4
                </button>
                <button
                  onClick={() => handleInputNumber("5")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  5
                </button>
                <button
                  onClick={() => handleInputNumber("6")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  6
                </button>
                <button
                  onClick={() => handleOperator("+")}
                  className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer"
                >
                  +
                </button>

                {/* Row 4 */}
                <button
                  onClick={() => handleInputNumber("1")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  1
                </button>
                <button
                  onClick={() => handleInputNumber("2")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  2
                </button>
                <button
                  onClick={() => handleInputNumber("3")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  3
                </button>
                <button
                  onClick={() => handleCalculation("equalSign")}
                  className="row-span-2 bg-[#1f2937] text-white text-2xl font-bold rounded-xl flex items-center justify-center hover:bg-[#13181f] cursor-pointer"
                >
                  =
                </button>

                {/* Row 5 */}
                <button
                  onClick={() => handleInputNumber("0")}
                  className="col-span-2 bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  0
                </button>
                <button
                  onClick={() => handleInputNumber(".")}
                  className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                >
                  .
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[20vh] bg-slate-50 flex items-start justify-center">
        {error && (
          <p className="text-center text-red-400 text-lg mt-2">{error}</p>
        )}
      </div>
    </>
  );
};

export default App;
