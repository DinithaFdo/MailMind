// SummaryDetails.tsx
import { Button } from "@/components/ui/button";

const SummaryDetails = ({ summary, onModifyClick, onDeleteClick }) => {
  return (
    <div className="flex-1 p-6 bg-white shadow-lg rounded-l-lg">
      {summary ? (
        <div className="flex flex-col items-start space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900">
            {summary.name}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(summary.createdAt).toLocaleString()}
          </p>
          <p className="mt-6 text-lg">{summary.summary}</p>
          <div className="mt-6">
            <p className="font-semibold text-gray-700">Tags:</p>
            <div className="flex gap-3 flex-wrap">
              {summary.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-6">
            <Button
              onClick={onModifyClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none"
            >
              Modify
            </Button>
            <Button
              onClick={() => onDeleteClick(summary._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none"
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <p>No summary selected</p>
      )}
    </div>
  );
};

export default SummaryDetails;
