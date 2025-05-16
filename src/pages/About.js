const features = [
  {
    name: "AI-Powered Analysis",
    description:
      "Our advanced algorithms analyze websites for AI-friendliness, providing comprehensive scores and recommendations.",
  },
  {
    name: "Real-time Scoring",
    description:
      "Get instant feedback on your websites AI compatibility and learn how to improve its accessibility.",
  },
  {
    name: "Detailed Reports",
    description:
      "Receive detailed reports with actionable insights to optimize your website for AI crawlers and machine learning systems.",
  },
  {
    name: "Expert Resources",
    description:
      "Access our library of articles and guides written by industry experts to stay up-to-date with AI-friendly practices.",
  },
];

export default function About() {
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            About Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Making the web more AI-friendly
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're dedicated to helping website owners and developers create
            content that's optimized for AI systems, improving accessibility and
            discoverability in the age of artificial intelligence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start optimizing your website today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join thousands of website owners who are already using our
              platform to improve their AI-friendliness scores and reach a wider
              audience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/auth/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a>
              <a
                href="/articles"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
