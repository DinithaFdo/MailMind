import { Input } from "@/components/ui/input";

interface SummarizationItem {
  _id: string;
  name: string;
  summary: string;
  tags?: string[];
}

interface SummariesListProps {
  summaries: SummarizationItem[];
  onSelectSummary: (summary: SummarizationItem) => void;
  onSearchChange: (term: string) => void;
}

const SummariesList = ({
  summaries,
  onSelectSummary,
  onSearchChange,
}: SummariesListProps) => {
  return (
    <div className="w-1/3 p-6 overflow-y-auto h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Summaries</h2>

      <Input
        type="text"
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name, content, or tags"
        className="w-full p-4 mb-6 border rounded-xl shadow-md focus:outline-none"
      />

      <ul className="space-y-6">
        {summaries.map((summary) => (
          <li
            key={summary._id}
            className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() => onSelectSummary(summary)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {summary.name}
            </h3>
            <p className="text-gray-600">{summary.summary.slice(0, 50)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummariesList;
