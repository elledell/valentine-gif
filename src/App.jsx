import React, { useState } from "react";

import quizImage from "./assets/quiz.webp"; 

function App() {
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [isHovered, setIsHovered] = useState(false);
  const [accepted, setAccepted] = useState(false);

 
  const moveButton = () => {
    if (!isHovered) setIsHovered(true);

    const randomX = Math.floor(Math.random() * (window.innerWidth - 150));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 150));

    setNoPosition({ top: `${randomY}px`, left: `${randomX}px` });
  };


  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100 overflow-hidden relative selection:bg-pink-300">
      {accepted ? (
       
        <div className="text-center animate-bounce">
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Kissing Bears"
            className="w-64 h-64 mx-auto mb-4 object-contain mix-blend-multiply"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-red-600 mb-4 drop-shadow-lg">
            YAYYYY! ❤
          </h1>
          <p className="text-2xl md:text-3xl text-pink-700 font-medium">
            Best decision ever! (I knew you'd say yes 😉)
          </p>
        </div>
      ) : (
       
        <div className="text-center px-4">
          <div className="mb-8 flex flex-col items-center">
            
            <img
              src={quizImage}
              alt="Cute Bear Asking"
              className="w-56 h-56 object-contain mb-4 drop-shadow-md mix-blend-multiply"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold text-red-500 tracking-wide drop-shadow-sm leading-tight">
              Will you be my Valentine?
            </h1>
          </div>

          <div className="flex flex-wrap gap-6 justify-center items-center w-full">
           
            <button
              onClick={handleYesClick}
              className="px-8 py-4 bg-green-500 text-white font-bold text-2xl rounded-full shadow-xl hover:bg-green-600 hover:scale-110 transition-transform duration-200 z-10 cursor-pointer"
            >
              YES ❤
            </button>

            
            <button
              onMouseEnter={moveButton} 
              onClick={moveButton} 
              style={
                isHovered
                  ? {
                      position: "absolute",
                      top: noPosition.top,
                      left: noPosition.left,
                    }
                  : {}
              }
              className={`px-8 py-4 bg-red-500 text-white font-bold text-2xl rounded-full shadow-xl transition-all duration-100 ease-out z-20 cursor-pointer ${
                isHovered ? "absolute" : "relative"
              }`}
            >
              NO 💔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;