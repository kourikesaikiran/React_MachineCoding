import logo from "./logo.svg";
import "./App.css";
import DropDown from "./Dropdown/dropdown";

function App() {
  const data = [
    {
      title: "Title 01",
      options: ["Option 01", "Option 02"],
    },
    {
      title: "Title 02",
      options: ["Option 01", "Option 02"],
    },
  ];
  return (
    <div className="App">
      {data.map((item) => (
        <DropDown componentObject={item} />
      ))}
    </div>
  );
}

export default App;
