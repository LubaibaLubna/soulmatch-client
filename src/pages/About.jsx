const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
          About SoulMatch
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          SoulMatch is a modern and trusted matrimony platform helping individuals
          find their ideal life partners across Bangladesh. With a commitment to
          genuine profiles, privacy, and compatibility-based suggestions,
          SoulMatch brings together hearts that are meant to be together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-pink-500 mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              To create meaningful connections that lead to lifelong relationships
              through a safe, easy-to-use, and culturally relevant platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-pink-500 mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              To be Bangladesh’s most trusted and preferred online matrimony service
              for all communities, focusing on compatibility and trust.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-pink-500 mb-2">Why SoulMatch?</h3>
            <p className="text-gray-600 text-sm">
              Verified biodatas, modern filters, success stories, and a user-friendly
              design built with care to match you with the right partner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
