import { useCallback, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isCharacters, setIsCharacters] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const generatePassword = useCallback(() => {
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@#$%^&*()_+";
    let combined = characters;
    if (isNumbers) combined += numbers;
    if (isCharacters) combined += specialCharacters;
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * combined.length);
      pass += combined.charAt(random);
    }
    setPassword(pass);
  }, [length, isNumbers, isCharacters]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumbers, isCharacters, generatePassword]);
  return (
    <div className="flex flex-col justify-center items-center  bg-gray-900">
      {/* title section  */}
      <div className="text-center text-green-500 m-4 font-extrabold font-serif">
        <h1 className="text-4xl">Password Generator</h1>
      </div>
      {/* Password Input and button */}
      <div className="flex bg-gray-800 shadow-md rounded-lg p-4 m-4">
        <input
          className="outline-none py-2 px-4 rounded-md "
          type={isPasswordVisible ? "text" : "password"}
          readOnly
          placeholder="Generate Password"
          value={password}
        />
        {isPasswordVisible ? (
          <FaRegEyeSlash
            className="text-black text-9xl relative h-4 text-center top-3 right-10  cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        ) : (
          <FaRegEye
            className="text-black text-9xl relative h-4 text-center top-3 right-10  cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        )}

        <button className="bg-blue-500 w-full py-2 px-4 rounded-md text-white font-medium cursor-pointer">
          Copy
        </button>
      </div>
      {/* password customizations */}
      <div className="flex bg-gray-700 justify-between p-4 m-2 rounded-lg  gap-4 text-white">
        <label htmlFor="length" className="flex items-center gap-1">
          <input
            type="range"
            onChange={(e) => setLength(e.target.value)}
            max={30}
            min={8}
          />
          Length : {length}
        </label>

        <label htmlFor="numbers" className="flex items-center gap-1">
          <input
            type="checkbox"
            onChange={() => setIsNumbers((prev) => !prev)}
          />
          Numbers
        </label>

        <label htmlFor="characters" className="flex items-center gap-1">
          <input
            type="checkbox"
            onChange={() => setIsCharacters((prev) => !prev)}
          />
          Characters
        </label>
      </div>
      {/* password generation button */}
      <div className="flex justify-center">
        <button
          className="bg-green-500 w-full py-2 px-4 m-2 rounded-md text-white font-medium cursor-pointer"
          onClick={generatePassword}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
