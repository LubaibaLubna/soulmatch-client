import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SuccessStorySection = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/success-stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch(() => {});
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-pink-700 mb-12">
          💖 Success Stories
        </h2>

        {stories.length > 0 ? (
          <Slider {...settings}>
            {stories.map((story, index) => (
              <div key={index} className="px-3">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 group">
                  <div className="overflow-hidden">
                    <img
                      src={`http://localhost:5000${story.coupleImage}`}
                      alt="Couple"
                      className="w-full h-60 object-cover group-hover:brightness-95 duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 mb-1 text-sm">
                      Married on:{" "}
                      <span className="font-medium text-pink-600">
                        {new Date(story.marriageDate).toLocaleDateString()}
                      </span>
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(story.stars)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 mr-1" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {story.story.length > 150
                        ? `${story.story.slice(0, 150)}...`
                        : story.story}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500 mt-10">No stories found.</p>
        )}
      </div>
    </section>
  );
};

export default SuccessStorySection;
