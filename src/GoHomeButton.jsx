import { Link } from "react-router-dom";

export default function GoHomeButton({ text = "← Back to Home" }) {
  return (
    <div className="mt-4 ml-4">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium underline"
      >
        {text}
      </Link>
    </div>
  );
}
