import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ServiceSelector() {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      name: 'Home Visit',
      icon: '🏠',
      description: 'Get treatment at your preferred location',
      benefits: [
        'Personalized home environment',
        'No travel required',
        'All equipment brought to you'
      ],
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      id: 2,
      name: 'Clinic Visit',
      icon: '🏥',
      description: 'Visit our state-of-the-art facility',
      benefits: [
        'Advanced equipment available',
        'Multi-specialty support',
        'Structured treatment environment'
      ],
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      id: 3,
      name: 'Digital Session',
      icon: '💻',
      description: 'Virtual consultation via video call',
      benefits: [
        'Consult from anywhere',
        'Flexible scheduling',
        'Digital exercise plans'
      ],
      color: 'bg-purple-50 hover:bg-purple-100'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">Choose Your Service Type</h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Select the consultation method that best fits your needs and schedule
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <Link
              to={`/find-physio?type=${encodeURIComponent(service.name)}`}
              className={`${service.color} border border-gray-200 p-8 rounded-xl shadow-sm transition-all duration-300 block h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-4 h-4 mt-1 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {hoveredService === service.id && (
                  <div className="mt-4 text-center">
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Select {service.name}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-4">Not sure which to choose?</p>
        <Link 
          to="/contact" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Contact our support team →
        </Link>
      </div>
    </div>
  );
}