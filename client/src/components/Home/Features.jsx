import React from 'react';

const features = [
  {
    title: "Discover Our Innovative Voting Features",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Stay Informed with Real-Time Updates",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Secure Login for Peace of Mind",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

export default function Features() {
  return (
    <div className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Short heading goes here
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}