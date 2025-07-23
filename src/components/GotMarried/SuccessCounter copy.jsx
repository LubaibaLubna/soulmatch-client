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

  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    fetch("https://ass-12-server-wheat.vercel.app/api/biodata-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const counters = [
    { label: "Total Biodatas", value: stats.total, icon: "📄" },
    { label: "Male Biodatas", value: stats.maleCount, icon: "👦" },
    { label: "Female Biodatas", value: stats.femaleCount, icon: "👧" },
    { label: "Marriages Completed", value: stats.marriageCount, icon: "💍" },
  ];

  return (
    <section className="py-10 bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4">
  

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onViewportEnter={() => setStartCount(true)}
        >
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="space-y-3"
            >
              <div className="text-3xl">{counter.icon}</div>
              <div className="text-4xl font-bold text-pink-500">
                {startCount && (
                  <CountUp
                    start={0}
                    end={counter.value}
                    duration={2}
                    useEasing={false}
                    useGrouping={true}
                  />
                )}
              </div>
              <p className="text-base font-medium text-gray-300">
                {counter.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessCounter;
