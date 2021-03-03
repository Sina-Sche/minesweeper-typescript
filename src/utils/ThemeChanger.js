import { useEffect, useState } from "react";

const ThemeChanger = () => {
  const [theme, setTheme] = useState(false);

  const handleChange = () => {
    setTheme(!theme);
    if (theme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };
  useEffect(() => {}, [theme]);

  return (
    <button className="ThemeButton" onClick={handleChange}>
      {theme ? "🌙" : "☀"}
    </button>
  );
};

export default ThemeChanger;
