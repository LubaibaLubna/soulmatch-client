const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-white">
      <div className="max-w-md w-full p-6 rounded-lg border border-gray-200 shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Contact Us
        </h2>

        <div className="space-y-4 text-gray-700 text-sm">
          <div>
            <span className="font-medium block">Email:</span>
            support@soulmatch.com
          </div>

          <div>
            <span className="font-medium block">Phone:</span>
            +880 1234-567890
          </div>

          <div>
            <span className="font-medium block">Office Address:</span>
            House #123, Road #7, Gulshan, Dhaka 1212, Bangladesh
          </div>

          <div>
            <span className="font-medium block">Support Hours:</span>
            Saturday – Thursday | 9:00 AM – 6:00 PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
