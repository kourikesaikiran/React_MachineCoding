import React from "react";
import Accordion from "./Components/Accordion/Accordion";

const data = [
  {
    header: "Header 01",
    content: "Content 01",
  },
  {
    header: "Header 02",
    content: "Content 02",
    children: [
      {
        header: "Sub Header 1",
        content: "Nested Content 1",
      },
      {
        header: "Sub Header 2",
        content: "Nested Content 2",
        children: [
          {
            header: "Sub Sub Header 1",
            content: "Deep Nested Content 1",
          },
        ],
      },
    ],
  },
  {
    header: "Header 03",
    content: "Content 03",
  },
  {
    header: "Header 04",
    content: "Content 04",
  },
];

function App() {
  return (
    <div>
      <h2>Enhanced Accordion</h2>
      <Accordion data={data} />
    </div>
  );
}

export default App;
