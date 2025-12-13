import { useEffect, useState } from "react";
import MarkdownCard from "./components/MarkdownCard";

function App() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/README.md")
      .then(res => res.text())
      .then(setMarkdown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <MarkdownCard content={markdown} />
    </div>
  );
}

export default App;