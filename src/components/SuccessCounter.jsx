import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const SuccessCounter = () => {
  const [stats, setStats] = useState({
    total: 0,
    maleCount: 0,
    femaleCount: 0,
    marriageCount: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/biodata-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const counters = [
    {
      label: "Total Biodatas",
      value: stats.total,
      icon: "📄",
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Male Biodatas",
      value: stats.maleCount,
      icon: "👦",
      color: "bg-sky-100 text-sky-600",
    },
    {
      label: "Female Biodatas",
      value: stats.femaleCount,
      icon: "👧",
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "Marriages Completed",
      value: stats.marriageCount,
      icon: "💍",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Our Success at a Glance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {counters.map((counter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`flex flex-col items-center p-6 rounded-lg shadow ${counter.color}`}
            >
              <div className="text-4xl mb-2">{counter.icon}</div>
              <h3 className="text-3xl font-bold">
                <CountUp end={counter.value} duration={2} />
              </h3>
              <p className="mt-2 text-sm font-medium">{counter.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
