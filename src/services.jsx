import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GoHomeButton from "./GoHomeButton";
export default function Services() {
  const services = [
    {
      id: 1,
      name: "Clinic Visit",
      image: "/images/ClinicVisit.jpg",
      description: "Visit our expert physiotherapists at our state-of-the-art facility",
      benefits: [
        "Advanced equipment available",
        "Multi-specialty support",
        "Structured treatment environment"
      ]
    },
    {
      id: 2,
      name: "Home Visit",
      image: "/images/HomeVisit.jpg",
      description: "Get personalized care at your preferred location",
      benefits: [
        "Personalized home environment",
        "No travel required",
        "All equipment brought to you"
      ]
    },
    {
      id: 3,
      name: "Digital Session",
      image: "/images/digitalphiso.jpg",
      description: "Consult our specialists online via secure video platform",
      benefits: [
        "Consult from anywhere",
        "Flexible scheduling",
        "Digital exercise plans"
      ]
    }
  ];

  return (
    
    <section className="container mx-auto px-6 py-12">
       <GoHomeButton />
      <div className="text-center mb-12"> 
        
        <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
          Choose the best physiotherapy service tailored to your needs and schedule
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                
                <ul className="mt-4 space-y-2">
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
              <div className="px-6 pb-6">
                <Link
                  to={`/find-physio?type=${encodeURIComponent(service.name)}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                >
                  Book {service.name}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Not sure which service is right for you?</p>
        <Link
          to="/contact"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          Contact our team for guidance
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}