"use client"

import { Link } from "react-router-dom"
import img1 from "../asset/img/img1.jpg"
import leanghai from "../asset/img/leanghai.jpg"

export default function About() {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-black">
              About <span className="text-gray-800">Tech Store</span>
            </h1>
            <p className="text-xl mb-8 leading-relaxed text-black">
              We're passionate about bringing you the best tech gear — from high-performance laptops to precision gaming accessories. 
              Our mission is simple: make premium technology accessible to everyone who loves performance and design.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={img1}
              alt="Our Mission"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-black">Our Mission</h2>
            <p className="text-black leading-relaxed mb-4">
              At Tech Store, we believe that technology should empower creativity, productivity, and play. 
              Whether you're a gamer, a creator, or a professional, our goal is to provide gear that performs as hard as you do.
            </p>
            <p className="text-black leading-relaxed">
              Every product in our collection is carefully selected for quality, reliability, and style. 
              We partner with trusted brands to ensure every purchase gives you real value and satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Core Values</h2>
            <p className="text-black">
              These are the principles that guide everything we do at Tech Store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-300 rounded-lg p-8 hover:border-black transition-all text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Innovation</h3>
              <p className="text-black">
                We embrace the latest technology to keep you ahead in performance and experience.
              </p>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-8 hover:border-black transition-all text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Quality</h3>
              <p className="text-black">
                Every product is tested and selected for durability, design, and premium feel.
              </p>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-8 hover:border-black transition-all text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2 text-black">Trust</h3>
              <p className="text-black">
                Our customers come first — we deliver what we promise, every single time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">Meet Our Team</h2>
          <p className="text-black">
            A passionate team of tech enthusiasts, designers, and developers behind every product we offer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Seavmey", role: "UI/UX Designer", img: "/team2.jpg" },
            { name: "Leang Hai", role: "Founder & CEO", img: leanghai },
            { name: "Lyhur", role: "Product Manager", img: "/team3.jpg" },
          ].map((member) => (
            <div key={member.name} className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:border-black transition-all">
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-black">{member.name}</h3>
              <p className="text-sm text-gray-700">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-gray-300 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Join Our Tech Journey</h2>
          <p className="mb-8 max-w-2xl mx-auto leading-relaxed text-black">
            Whether you're looking to upgrade your setup or explore cutting-edge technology, 
            Tech Store is here to help you make it happen.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
