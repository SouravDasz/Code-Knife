
import React, { useState } from "react";
import {
  BrainCircuit,
  Code2,
  FolderTree,
  Workflow,
  MessageSquareCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GitBranch,
  LoaderCircle,
  Link2,
} from "lucide-react";

const Body = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");

    const url = repoUrl.trim();

    // Validate GitHub repository URL
    const match = url.match(
      /^https:\/\/github\.com\/([^/]+)\/([^/?#]+)\/?$/
    );

    if (!match) {
      setError(
        "Enter a valid GitHub repository URL, e.g. https://github.com/owner/repository"
      );
      return;
    }

    const [, owner, repository] = match;
    const repo = repository.replace(/\.git$/, "");

    setLoading(true);

    try {
      // Replace this with your FastAPI endpoint.
      const response = await fetch(
        `http://localhost:8000/repository/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner,
            repository: repo,
            url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Repository analysis failed.");
      }

      // Navigate to your results page.
      // Adapt this to your React Router setup.
      sessionStorage.setItem(
        "repositoryAnalysis",
        JSON.stringify(data)
      );

      window.location.href = "/repository/results";
    } catch (err) {
      setError(
        err.message ||
          "Unable to analyze the repository. Check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: BrainCircuit,
      title: "AI Code Understanding",
      description:
        "Understand complex code, functions, and project logic with AI-powered explanations.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: FolderTree,
      title: "Visual File Explorer",
      description:
        "Explore folders, files, and project structure in an organized interactive tree.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Workflow,
      title: "Architecture Mapping",
      description:
        "Visualize how modules, APIs, databases, and application components connect.",
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      icon: MessageSquareCode,
      title: "Ask Your Repository",
      description:
        "Ask questions about your codebase and discover relevant files and functions.",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">
      {/* Repository Upload Hero */}
      <section className="relative px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-sky-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-[900px]">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              AI Repository Explorer
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl md:text-6xl">
              Understand any codebase.
              <br />
              <span className="text-[#4BA3E8]">
                Build with confidence.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[650px] text-base leading-8 text-gray-500 sm:text-lg">
              Connect your GitHub repository and let your AI Copilot
              explain the code, visualize the project structure, and
              help you understand how everything works together.
            </p>
          </div>

          {/* Upload Card */}
          <div className="mx-auto mt-12 max-w-[760px] rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_12px_50px_rgba(75,163,232,0.10)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#4BA3E8]">
                <GitBranch size={27} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-950">
                  Connect your repository
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Paste a GitHub repository URL to get started.
                </p>
              </div>
            </div>

            <form onSubmit={handleAnalyze} className="mt-7">
              <label
                htmlFor="repository-url"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                GitHub Repository URL
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 transition focus-within:border-[#4BA3E8] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
                  <Link2
                    size={19}
                    className="shrink-0 text-gray-400"
                  />

                  <input
                    id="repository-url"
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className="h-[52px] w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4BA3E8] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3293DF] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Repository
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#4BA3E8]" />
                  Public repositories supported
                </span>
                <span className="flex items-center gap-2">
                  <GitBranch size={15} className="text-[#4BA3E8]" />
                  Explore your project structure
                </span>
              </div>
            </form>

            <div className="mt-7 rounded-xl border border-dashed border-blue-200 bg-[#F8FBFF] p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#4BA3E8] shadow-sm">
                  <FolderTree size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    What happens next?
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Your repository is scanned and prepared for
                    interactive exploration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#4BA3E8]" />
              Privacy-minded
            </span>
            <span className="flex items-center gap-2">
              <Code2 size={16} className="text-[#4BA3E8]" />
              Developer-focused
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#4BA3E8]" />
              AI-powered insights
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 bg-[#F8FBFF] px-6 py-20 md:px-8 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-[760px] text-center">
            <span className="text-sm font-semibold uppercase tracking-[2px] text-[#4BA3E8]">
              One repository. Complete understanding.
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Explore your codebase like never before
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-500">
              From navigating unfamiliar projects to understanding
              application architecture, your copilot helps make
              complex repositories easier to explore.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.07)]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-white px-7 py-9 text-center sm:flex-row sm:px-10 sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-gray-950 sm:text-2xl">
                Ready to explore your code?
              </h3>
              <p className="mt-2 max-w-[600px] text-sm leading-6 text-gray-500 sm:text-base">
                Start with a GitHub URL and discover what your
                project is made of.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("repository-url")
                  ?.focus()
              }
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#4BA3E8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3293DF]"
            >
              Get started
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

// Small reusable icon component
const Code2Icon = () => (
  <span className="inline-flex text-[#4BA3E8]">
    <BrainCircuit size={16} />
  </span>
);

export default Body;
