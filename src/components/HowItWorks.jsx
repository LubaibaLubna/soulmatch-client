import { FaUserPlus, FaSearch, FaComments } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={32} className="text-pink-500" />,
      title: "Create Your Profile",
      description:
        "Sign up and build a biodata with your photo, personal info, and partner expectations.",
    },
    {
      icon: <FaSearch size={32} className="text-pink-500" />,
      title: "Browse Matches",
      description:
        "View and filter potential matches based on location, age, and interests.",
    },
    {
      icon: <FaComments size={32} className="text-pink-500" />,
      title: "Connect & Communicate",
      description:
        "Express interest, connect with matches, and chat securely.",
    },
  ];

  return (
    <section className="py-12 max-w-4xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-6 rounded-xl shadow text-center transition-all duration-500 ease-in-out transform hover:-translate-y-2 bg-gray-50"
            >
              {/* Angular gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rotate-2 scale-110"></div>

              <div className="relative z-10">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
