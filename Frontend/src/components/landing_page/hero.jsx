
import React from "react";
import {
  BrainCircuit,
  ShieldCheck,
  Bug,
  Code2,
  Sparkles,
  ArrowRight,
  LockKeyhole,
  Terminal,
} from "lucide-react";

const appCards = [
  {
    id: 1,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPs4aLjB6PrVFbGobXz0h7wluc7p07sCyaPnyTHvWSA&s=10",
    position: "left-[49%] top-[8%] rotate-[-12deg]",
    size: "h-20 w-20",
  },
  {
    id: 2,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTjyBpj0hEHxJi0aup5buizKHn9m2NhiwHNk7PiFFCA&s=10",
    position: "left-[66%] top-[13%] rotate-[12deg]",
    size: "h-[72px] w-[72px]",
  },
  {
    id: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNqGfl1fYb4JPtig6JMWiA1F9W70r68GdMSFZZrQw1Zg&s=10",
    position: "left-[82%] top-[8%] rotate-[10deg]",
    size: "h-[72px] w-[72px]",
  },
  {
    id: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFhgbMXZFIV45W8pOK_Ij0dAhF4uyCmKlNLdbExmWNww&s=10",
    position: "left-[46%] top-[36%] rotate-[10deg]",
    size: "h-[72px] w-[72px]",
  },
  {
    id: 5,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxx7DNaAesyWq5lUXd1lSA0O26YXo3hYk6H22XyiYZcg&s=10",
    position: "left-[64%] top-[39%] rotate-[-10deg]",
    size: "h-20 w-20",
  },
  {
    id: 6,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvAXbjGlCeVj12uIkac0Vk6cdD4F4p_QbWqfr8bHPxfg&s=10",
    position: "left-[82%] top-[35%] rotate-[12deg]",
    size: "h-[72px] w-[72px]",
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: "Your Private AI Copilot",
    description:
      "Get AI-powered assistance with coding, technical questions, and understanding complex concepts—all in one workspace.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Bug,
    title: "Debug With Confidence",
    description:
      "Understand errors, investigate unexpected behavior, and explore practical solutions to common development problems.",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Code2,
    title: "Build AI Applications",
    description:
      "Get guidance for developing AI and LLM-powered applications, from API integration to application architecture.",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-Minded Design",
    description:
      "Build within a workspace designed with privacy in mind, with data handling and protection determined by your implementation.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

const Hero = () => {
  return (
    <main className="overflow-hidden bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-24 pt-24 md:px-8 lg:pb-32 lg:pt-[110px]">
          <div className="max-w-[700px]">
            {/* Label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              AI Engineering Copilot
            </div>

            {/* Heading */}
            <h1 className="text-[48px] font-bold leading-[1.08] tracking-[-1.8px] text-gray-950 sm:text-[59px] lg:text-[66px]">
              Build smarter.
              <br />
              Debug faster.
              <br />
              <span className="text-[#4BA3E8]">
                Ship with confidence.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[550px] text-[16px] leading-[1.8] text-gray-500 sm:text-[18px]">
              Your AI-powered workspace for coding, debugging, and building
              intelligent applications. Get practical guidance from your
              private AI copilot throughout the development process.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#features"
                className="inline-flex h-[52px] items-center gap-3 rounded-lg bg-[#4BA3E8] px-7 text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#3293DF]"
              >
                Explore features
                <ArrowRight size={18} />
              </a>

              <a
                href="#about"
                className="inline-flex h-[52px] items-center gap-2 rounded-lg border border-gray-200 px-6 text-[16px] font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Learn more
              </a>
            </div>

            {/* Highlights */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <LockKeyhole size={16} className="text-[#4BA3E8]" />
                Privacy-minded
              </span>

              <span className="flex items-center gap-2">
                <Terminal size={16} className="text-[#4BA3E8]" />
                Developer-focused
              </span>
            </div>
          </div>
        </div>

        {/* Floating AI Logo Cards */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {appCards.map((card) => (
            <div
              key={card.id}
              className={`absolute ${card.position} ${card.size} flex items-center justify-center rounded-[22px] border-[7px] border-white bg-white shadow-[0_8px_30px_rgba(0,0,0,0.10)]`}
            >
              <img
                src={card.src}
                alt={`AI application ${card.id}`}
                className="h-full w-full rounded-lg object-contain"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* About the Project */}
      <section
        id="about"
        className="border-t border-gray-100 bg-[#F8FBFF] px-6 py-20 md:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-[760px] text-center">
            <span className="text-sm font-semibold uppercase tracking-[2px] text-[#4BA3E8]">
              One workspace. Smarter development.
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-[44px]">
              Meet your AI engineering Buddy
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-500 sm:text-lg">
              A development companion designed to simplify engineering
              workflows. From understanding code and solving bugs to exploring
              AI technologies, our goal is to help developers spend less time
              stuck and more time building.
            </p>
          </div>

          {/* Feature Cards */}
          <div
            id="features"
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.07)]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor}`}
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

          {/* Bottom call-to-action */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-white px-7 py-9 text-center sm:flex-row sm:px-10 sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-gray-950 sm:text-2xl">
                Ready to build something smarter?
              </h3>

              <p className="mt-2 max-w-[600px] text-sm leading-6 text-gray-500 sm:text-base">
                Explore how AI Engineering Copilot can support your development
                workflow.
              </p>
            </div>

            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#4BA3E8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3293DF]"
            >
              Get started
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
