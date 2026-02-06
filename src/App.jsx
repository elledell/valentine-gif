import React, { useState, useEffect } from "react"; // Added useEffect
import quizImage from "./assets/quiz.webp";

function App() {
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [isHovered, setIsHovered] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [secretCode, setSecretCode] = useState(null);

  // --- NEW LOGIC START ---
  const [recipientName, setRecipientName] = useState("");

  useEffect(() => {
    // This checks the URL for ?name=Hellen
    const queryParams = new URLSearchParams(window.location.search);
    const nameFromUrl = queryParams.get("name");
    
    // If a name is found, save it. Otherwise, leave it empty.
    if (nameFromUrl) {
      setRecipientName(nameFromUrl);
    }
  }, []);
  // --- NEW LOGIC END ---

  const codes = [
    "VALENTINE-CONFIRMED-2026",
    "CUPID-SAYS-YES",
    "DATE-NIGHT-LOCKED",
    "OFFICIALLY-YOURS",
    "HEART-KEY-ACCEPTED"
  ];

  const moveButton = () => {
    if (!isHovered) setIsHovered(true);
    const randomX = Math.floor(Math.random() * (window.innerWidth - 150));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 150));
    setNoPosition({ top: `${randomY}px`, left: `${randomX}px` });
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  const generateSecretCode = () => {
    const randomIndex = Math.floor(Math.random() * codes.length);
    setSecretCode(codes[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100 overflow-hidden relative selection:bg-pink-300">
      {accepted ? (
        <>
          {/* BOUNCING CONTENT (Bears & Text) */}
          <div className="text-center animate-bounce flex flex-col items-center max-w-lg px-4 pb-40">
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

          {/* STATIC FIXED BUTTON */}
          <div className="fixed bottom-10 left-0 right-0 flex justify-center px-4 z-50">
            {!secretCode ? (
              <button
                onClick={generateSecretCode}
                className="w-full max-w-md px-6 py-4 bg-purple-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:bg-purple-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                🔐 Generate Proof Code
              </button>
            ) : (
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border-2 border-purple-300 w-full max-w-md animate-fade-in-up">
                <p className="text-gray-600 mb-2 font-semibold uppercase tracking-wider text-xs text-center">
                  Send this code to your Valentine:
                </p>
                <h2 className="text-2xl font-black text-purple-600 tracking-widest text-center select-all cursor-pointer break-words">
                  {secretCode}
                </h2>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  (Tap text to copy)
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center px-4">
          <div className="mb-8 flex flex-col items-center">
            <img
              src={quizImage}
              alt="Cute Bear Asking"
              className="w-56 h-56 object-contain mb-4 drop-shadow-md mix-blend-multiply"
            />
            
            {/* UPDATED: Displays Name if present */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-red-500 tracking-wide drop-shadow-sm leading-tight">
              Will you be my Valentine{recipientName ? "," : "?"} <br />
              {recipientName && (
                <span className="text-purple-600">{recipientName}?</span>
              )}
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