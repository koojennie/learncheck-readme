import ReactMarkdown from "react-markdown";

export default function ReadmeCard({ content }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <article className="markdown text-gray-800">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}