import { useState } from "react";

const App = () => {

  const [primaryInputNumber, setPrimaryInputNumber] = useState([]);
  const [secondaryInputNumber, setSecondaryInputNumber] = useState([]);
  const [operator, setOperator] = useState("");

  const handleInputNumber = (number) => {
    if(operator && secondaryInputNumber.length <= 15){
      setSecondaryInputNumber([...secondaryInputNumber, number]);
    }
    else if(!operator && primaryInputNumber.length <= 15){
      setPrimaryInputNumber([...primaryInputNumber, number]);
    }
  };

  const handleOperator = (op) => {
    setOperator(op);
  };

  const handleCalculation = () => {
    let result = 0;
    if(operator === "+"){
      result = parseFloat(primaryInputNumber.join("")) + parseFloat(secondaryInputNumber.join(""));
    }
    else if(operator === "-"){
      result = parseFloat(primaryInputNumber.join("")) - parseFloat(secondaryInputNumber.join(""));
    }
    else if(operator === "×"){
      result = parseFloat(primaryInputNumber.join("")) * parseFloat(secondaryInputNumber.join(""));
    }
    else if(operator === "/"){
      result = parseFloat(primaryInputNumber.join("")) / parseFloat(secondaryInputNumber.join(""));
      console.log(result);
    }
    setPrimaryInputNumber([result]);
    setSecondaryInputNumber([]);
    setOperator("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
  <div className="w-full max-w-sm">
    {/* Calculator Card */}
    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
      {/* Display Section */}
      <div className="bg-[#1f2937] text-white p-6">
        <div className="text-right">
          <div className="text-4xl font-bold leading-tight break-words">{(primaryInputNumber.length > 0 && secondaryInputNumber.length === 0) ? primaryInputNumber : (primaryInputNumber.length > 0 && secondaryInputNumber.length > 0) ? secondaryInputNumber : 0}</div>
          {
            operator && (
              <p className="text-xs opacity-75 mt-1">{primaryInputNumber}{operator}</p>
            )
          }
          
        </div>
      </div>

      {/* Button Grid */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button onClick={() => {
            setPrimaryInputNumber([]);
            setSecondaryInputNumber([]);
            setOperator("");
          }} className="col-span-2 bg-red-500 text-white h-14 text-lg font-semibold rounded-xl flex items-center justify-center hover:bg-red-600 cursor-pointer">
            Clear
          </button>
          <button onClick={() => handleOperator("/")} className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer">
            ÷
          </button>
          <button onClick={() => handleOperator("×")} className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer">
            ×
          </button>

          {/* Row 2 */}
          <button onClick={() => handleInputNumber(7)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            7
          </button>
          <button onClick={() => handleInputNumber(8)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            8
          </button>
          <button onClick={() => handleInputNumber(9)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            9
          </button>
          <button onClick={() => handleOperator("-")} className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer">
            −
          </button>

          {/* Row 3 */}
          <button onClick={() => handleInputNumber(4)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            4
          </button>
          <button onClick={() => handleInputNumber(5)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            5
          </button>
          <button onClick={() => handleInputNumber(6)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            6
          </button>
          <button onClick={() => handleOperator("+")} className="bg-gray-300 text-gray-800 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-400 cursor-pointer">
            +
          </button>

          {/* Row 4 */}
          <button onClick={() => handleInputNumber(1)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            1
          </button>
          <button onClick={() => handleInputNumber(2)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            2
          </button>
          <button onClick={() => handleInputNumber(3)} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            3
          </button>
          <button onClick={handleCalculation} className="row-span-2 bg-[#1f2937] text-white text-2xl font-bold rounded-xl flex items-center justify-center hover:bg-[#13181f] cursor-pointer">
            =
          </button>

          {/* Row 5 */}
          <button onClick={() => handleInputNumber(0)} className="col-span-2 bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            0
          </button>
          <button onClick={() => handleInputNumber(".")} className="bg-gray-100 text-gray-900 h-14 text-xl font-semibold rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer">
            .
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default App;
