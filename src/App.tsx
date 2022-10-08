import { useEffect, useState } from "react";

function App() {
  const [pass, setPass] = useState("");
  const [buttonContent, setButtonContent] = useState("Copy Password");
  const [passLength, setPassLength] = useState(8);

  const getRandomInt = (max: number) => Math.floor(Math.random() * max);

  const getPassword = (length: Number) => {
    const symbols = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    const numbers = "0123456789";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdedfghijklmnopqrstuvwxyz";

    let pass = "";
    for (let i = 0; i < length; i++) {
      const randomOfType = getRandomInt(4);
      const randomOfSymbols = getRandomInt(symbols.length);
      const randomOfNumbers = getRandomInt(10);
      const randomOfUpper = getRandomInt(26);
      const randomOfLower = getRandomInt(26);
      switch (randomOfType) {
        case 0:
          pass += symbols[randomOfSymbols];
          break;
        case 1:
          pass += numbers[randomOfNumbers];
          break;
        case 2:
          pass += upper[randomOfUpper];
          break;
        case 3:
          pass += lower[randomOfLower];
          break;
      }
    }
    return pass;
  };

  const updatePass = () => {
    const pass = getPassword(passLength);
    setPass(pass);
    setButtonContent("Copy");
  };

  const handlePaste = () => {
    navigator.clipboard.writeText(pass).then(
      () => {
        navigator.clipboard.readText().then((clipText) => {
          setButtonContent("You got it");
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tar = e.target;
    setPassLength(Number(tar.value));
  };

  useEffect(() => {
    updatePass();
  }, [passLength]);

  return (
    <div className="App flex flex-col justify-center items-center gap-8 mt-10">
      <h2 className="text-3xl font-bold">Hephaestus</h2>
      <button
        onClick={updatePass}
        className="bg-blue-300 px-4 py-2 font-bold rounded-lg"
      >
        Get a random password
      </button>
      <code>{pass}</code>
      <button
        onClick={handlePaste}
        className="bg-green-300 px-4 py-2 font-bold rounded-lg"
      >
        {buttonContent}
      </button>
      <input
        type="range"
        min="8"
        max="18"
        defaultValue={passLength}
        step="2"
        onChange={(e) => handleSliderChange(e)}
        className="range w-1/3"
      />
      <div className="w-1/3 flex justify-between text-xs px-2 -mt-4">
        <span>8</span>
        <span>10</span>
        <span>12</span>
        <span>14</span>
        <span>16</span>
        <span>18</span>
      </div>
    </div>
  );
}

export default App;
