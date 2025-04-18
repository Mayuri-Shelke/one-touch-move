import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#f4f7f8] text-gray-800 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          About One Touch Move
        </h1>

        <p className="text-lg leading-8 text-center text-gray-700 mb-10">
          One Touch Move is a modern physiotherapy solution, dedicated to
          improving lives through personalized treatment options—whether it’s at
          home, in the clinic, or digitally.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/images/logo.png"
            alt="Physiotherapy Session"
            className="rounded-2xl shadow-lg w-full"
          />
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Certified and experienced physiotherapists</li>
              <li>Convenient home & digital therapy sessions</li>
              <li>24/7 booking support with easy appointment options</li>
              <li>Holistic care tailored to your needs</li>
              <li>Trusted by hundreds of happy patients</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Our Mission
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-7">
            To make professional physiotherapy accessible to everyone,
            everywhere—ensuring health, mobility, and wellness is just a touch
            away. We believe in combining technology with human care to deliver
            exceptional health outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
