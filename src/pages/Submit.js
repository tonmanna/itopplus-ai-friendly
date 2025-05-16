import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Submit() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Submit Website
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter a website URL to analyze its AI-friendliness score.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Website URL
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  name="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="https://example.com"
                  required
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Please include the full URL including http:// or https://.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
              >
                {isLoading ? "Analyzing..." : "Submit for Analysis"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
