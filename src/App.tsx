import { useEffect, useState } from "react";

function App() {
  const [pass, setPass] = useState("");

  const getRandomInt = (max: number) => Math.floor(Math.random() * max);

  const getPassword = () => {
    const symbols = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    const numbers = "0123456789";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdedfghijklmnopqrstuvwxyz";

    let pass = "";
    for (let i = 0; i < 10; i++) {
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
    const pass = getPassword();
    setPass(pass);
  };

  useEffect(() => {
    updatePass();
  }, []);

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
    </div>
  );
}

export default App;
