import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual submission logic (Firestore, EmailJS, etc.)
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Contact Our Team</h2>
          <p className="text-center text-gray-600 mb-8">
            Get personalized guidance on choosing the right physiotherapy service
          </p>
        </motion.div>

        {submitSuccess ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
          >
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
            <p className="text-green-600">
              Our team will contact you within 24 hours to discuss your needs.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-50 p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How can we help?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Call Us</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Email Us</h4>
                      <p className="text-gray-600">support@onetouchmove.com</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Visit Us</h4>
                      <p className="text-gray-600">123 Health St, Medical City</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="md:w-1/2 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      {...register('service')}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select a service</option>
                      <option value="Clinic Visit">Clinic Visit</option>
                      <option value="Home Visit">Home Visit</option>
                      <option value="Digital Session">Digital Session</option>
                      <option value="Not sure">Not sure - need advice</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message', { required: 'Message is required' })}
                      className={`w-full p-3 border rounded-lg ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}