import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function RegisterPhysio() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    location: '',
    experience: '',
    contact: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    // Name validation (2-50 characters)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Specialization validation
    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Experience validation (1-60 years)
    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience)) {
      newErrors.experience = 'Must be a number';
    } else if (formData.experience < 0) {
      newErrors.experience = 'Cannot be negative';
    } else if (formData.experience > 60) {
      newErrors.experience = 'Maximum 60 years';
    }

    // Contact validation (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Invalid phone number (10-15 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'physiotherapists'), {
        name: formData.name.trim(),
        specialization: formData.specialization.trim(),
        location: formData.location.trim(),
        experience: Number(formData.experience),
        contact: formData.contact.trim(),
        createdAt: new Date()
      });
      alert('Registration successful!');
      // Reset form
      setFormData({
        name: '',
        specialization: '',
        location: '',
        experience: '',
        contact: ''
      });
    } catch (error) {
      alert('Submission error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Physiotherapist Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Specialization Field */}
        <div>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className={`w-full p-2 border rounded ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
        </div>

        {/* Location Field */}
        <div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City"
            className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Experience Field */}
        <div>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of Experience"
            min="0"
            max="60"
            className={`w-full p-2 border rounded ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
        </div>

        {/* Contact Field */}
        <div>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`w-full p-2 border rounded ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Register'}
        </button>
      </form>
    </div>
  );
}