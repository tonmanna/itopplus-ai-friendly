import { useState } from "react";
import ScoreBadge from "../components/ScoreBadge";

// Temporary mock data for demonstration
const mockWebsites = [
  {
    id: 1,
    url: "example.com",
    score: 85,
    date: "2025-05-16",
    details: `asdsds asdasd asdas dasd asd asdas dasd assdas dasd asd
                        asdas das dasdasd asd asdasd ad asdas das dasda asdsad
                        asdsad asdasd asdas dasda sdas ddasd asdv asdasd asdas
                        dasd asdasds asdsadssad asdasd asdas dsad assdas dsa das`,
  },
  {
    id: 2,
    url: "test.org",
    score: 72,
    date: "2025-05-16",
    details: `asdsds asdasd asdas dasd asd asdas dasd assdas dasd asd
                        asdas das dasdasd asd asdasd ad asdas das dasda asdsad
                        asdsad asdasd asdas dasda sdas ddasd asdv asdasd asdas
                        dasd asdasds asdsadssad asdasd asdas dsad assdas dsa das`,
  },
  {
    id: 3,
    url: "demo.net",
    score: 45,
    date: "2025-05-16",
    details: `asdsds asdasd asdas dasd asd asdas dasd assdas dasd asd
                        asdas das dasdasd asd asdasd ad asdas das dasda asdsad
                        asdsad asdasd asdas dasda sdas ddasd asdv asdasd asdas
                        dasd asdasds asdsadssad asdasd asdas dsad assdas dsa das`,
  },
];

export default function Dashboard() {
  const [activeColumn, setActiveColumn] = useState(null);
  const [sparkles] = useState([]);
  const [isLoading] = useState(false);

  const handleColumnClick = () => {
    setActiveColumn("score");
    setTimeout(() => setActiveColumn(null), 1000);
  };

  return (
    <div className="space-y-6 fade-in p-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1
            className="text-4xl font-bold text-gray-900 bounce-in"
            style={{ color: "var(--crayon-purple)" }}
          >
            AI Friendly Scores
          </h1>
          <p
            className="mt-2 text-lg text-gray-700"
            style={{ color: "var(--crayon-blue)" }}
          >
            A list of websites and their AI-friendliness scores based on various
            factors.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => (window.location.href = "/submit")}
            className="block px-4 py-2 text-center text-lg font-bold text-white"
            style={{ backgroundColor: "var(--crayon-green)" }}
          >
            Add website
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="responsive-table">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-4 pl-4 pr-3 text-left text-xl font-bold sm:pl-6"
                    >
                      🌐 Website
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 text-center text-xl font-bold"
                      style={{ minWidth: "12rem" }}
                      onClick={handleColumnClick}
                    >
                      ⭐ Score
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 text-center text-xl font-bold"
                    >
                      📝 Details
                    </th>
                    <th
                      scope="col"
                      style={{ minWidth: "12rem" }}
                      className="px-3 py-4 text-left text-xl font-bold"
                    >
                      📅 Date Added
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array(3)
                        .fill(null)
                        .map((_, index) => (
                          <tr key={`loading-${index}`} className="loading-row">
                            <td className="py-4 pl-4 pr-3 sm:pl-6">&nbsp;</td>
                            <td className="px-3 py-4">&nbsp;</td>
                            <td className="px-3 py-4">&nbsp;</td>
                            <td className="px-3 py-4">&nbsp;</td>
                          </tr>
                        ))
                    : mockWebsites.map((website) => (
                        <tr key={website.id} className="hover:bg-gray-50">
                          <td
                            className="py-4 pl-4 pr-3 text-lg font-medium sm:pl-6"
                            style={{ color: "var(--crayon-blue)" }}
                            data-label="Website"
                          >
                            {website.url}
                          </td>
                          <td
                            className={`score-column px-3 py-4 text-lg relative text-center ${
                              activeColumn === "score" ? "active" : ""
                            }`}
                            onClick={handleColumnClick}
                            data-label="Score"
                          >
                            <ScoreBadge score={website.score} />
                            {sparkles.map((sparkle) => (
                              <span
                                key={sparkle.id}
                                className="sparkle"
                                style={sparkle.style}
                              />
                            ))}
                          </td>
                          <td
                            className="details-cell px-3 py-4 text-lg text-gray-700"
                            data-label="Details"
                          >
                            {website.details}
                          </td>
                          <td
                            className="px-3 py-4 text-lg text-gray-700 text-center"
                            data-label="Date Added"
                          >
                            {website.date}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
