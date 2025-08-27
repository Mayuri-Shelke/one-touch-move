import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
const IMGBB_API_KEY = 'd5389bff380b6ea40b8bc9736ff60b0a'; // Paste your ImgBB API key here

export default function RegisterPhysio() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    location: '',
    experience: '',
    contact: ''
  });
  const [services, setServices] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const auth = getAuth();

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setAuthData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setServices(prev => [...prev, value]);
    } else {
      setServices(prev => prev.filter(service => service !== value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience)) {
      newErrors.experience = 'Must be a number';
    } else if (formData.experience < 0 || formData.experience > 60) {
      newErrors.experience = 'Experience must be between 0-60';
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Invalid phone number (10-15 digits)';
    }

    if (!profilePic) {
      newErrors.profilePic = 'Profile picture is required';
    }

    if (services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const imageUrl = await uploadImageToImgBB(profilePic);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      const uid = userCredential.user.uid;

      await addDoc(collection(db, 'physiotherapists'), {
        uid,
        ...formData,
        experience: Number(formData.experience),
        contact: formData.contact.trim(),
        services,
        profilePic: imageUrl,
        createdAt: new Date()
      });

      alert('Registration successful!');
      setFormData({
        name: '',
        specialization: '',
        location: '',
        experience: '',
        contact: ''
      });
      setServices([]);
      setProfilePic(null);
    } catch (error) {
      alert('Submission error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Physiotherapist Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>

        {/* Input Fields */}
        {['name', 'specialization', 'location', 'experience', 'contact'].map(field => (
          <div key={field}>
            <input
              type={field === 'experience' ? 'number' : field === 'contact' ? 'tel' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className={`w-full p-2 border rounded ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}
        {/* Email */}
<div>
  <input
    type="email"
    name="email"
    value={authData.email}
    onChange={handleChange}
    placeholder="Email"
    className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
    required
  />
  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
</div>
          {/* Password */}
<div>
  <input
    type="password"
    name="password"
    value={authData.password}
    onChange={handleChange}
    placeholder="Password"
    className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
    required
  />
  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
</div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="w-full"
          />
          {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>}
        </div>

        {/* Services */}
        <div>
          <label className="block text-sm mb-1">Services Offered</label>
          {['Home Visit', 'Clinic Visit', 'Digital Session'].map(service => (
            <div key={service}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={service}
                  checked={services.includes(service)}
                  onChange={handleServiceChange}
                  className="mr-2"
                />
                {service}
              </label>
            </div>
          ))}
          {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
        </div>

        {/* Submit Button */}
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
