"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-28 pb-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black">
          Get in <span className="text-black">Touch</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions or need support? We'd love to hear from you.  
          Fill out the form below or reach out to us through our contact info.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left side - Contact Info */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border">
            <h3 className="text-2xl font-semibold text-black mb-6">Contact Info</h3>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 text-black rounded-full">
                  <Mail size={22} />
                </div>
                <span>support@mytechbrand.com</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 text-black rounded-full">
                  <Phone size={22} />
                </div>
                <span>+855 12 345 678</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 text-black rounded-full">
                  <MapPin size={22} />
                </div>
                <span>Phnom Penh, Cambodia</span>
              </li>
            </ul>

            <div className="mt-8">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.6713078238283!2d104.89098797453687!3d11.562108888654943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951b33a12a4c9%3A0xbad73bde622bb12b!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1699722777777!5m2!1sen!2skh"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl shadow-md"
              ></iframe>
            </div>
          </div>

          {/* Right side - Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-8 border"
          >
            <h3 className="text-2xl font-semibold text-black mb-6">
              Send us a Message
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
