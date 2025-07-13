import { FaUserPlus, FaSearch, FaComments } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={32} className="text-pink-500" />,
      title: "Create Your Profile",
      description: "Sign up and build a biodata with your photo, personal info, and partner expectations.",
    },
    {
      icon: <FaSearch size={32} className="text-pink-500" />,
      title: "Browse Matches",
      description: "View and filter potential matches based on location, age, and interests.",
    },
    {
      icon: <FaComments size={32} className="text-pink-500" />,
      title: "Connect & Communicate",
      description: "Express interest, connect with matches, and chat securely.",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 text-gray-700 rounded-lg shadow hover:shadow-md transition text-center"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
