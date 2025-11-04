import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@/components/common';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: '🔬',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms for accurate asbestos detection',
    },
    {
      icon: '⚡',
      title: 'Fast Results',
      description: 'Get preliminary results in seconds, not days',
    },
    {
      icon: '📱',
      title: 'Easy to Use',
      description: 'Simple 3-step process - upload, analyze, get results',
    },
    {
      icon: '🎯',
      title: 'High Accuracy',
      description: '3-tier classification system for reliable screening',
    },
    {
      icon: '🗺️',
      title: 'Find Inspection Centers',
      description: 'Get recommendations for certified inspection facilities',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Upload Image',
      description: 'Take a photo of the material and upload it to our platform',
      icon: '📸',
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our AI analyzes the image and provides instant results',
      icon: '🤖',
    },
    {
      number: 3,
      title: 'Get Results',
      description: 'Receive detailed analysis and next steps recommendations',
      icon: '📊',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Asbestos Detection
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Fast, accurate preliminary screening for asbestos materials using advanced AI technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/analysis">
              <Button size="lg" className="w-full sm:w-auto">
                Start Analysis
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">95%</p>
              <p className="text-sm md:text-base text-gray-600 mt-1">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">&lt;30s</p>
              <p className="text-sm md:text-base text-gray-600 mt-1">Analysis Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">24/7</p>
              <p className="text-sm md:text-base text-gray-600 mt-1">Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Simple 3-step process to get your results
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Why Choose Our Service?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Advanced technology meets user-friendly design
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} hoverable>
                  <div className="text-center">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your free analysis now and get results in seconds
            </p>
            <Link to="/analysis">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Analysis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-yellow-50 border-t border-b border-yellow-200 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex gap-4">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-yellow-900 mb-1">Important Notice</p>
              <p className="text-sm text-yellow-800">
                This application provides preliminary screening only. Results are not a substitute for professional laboratory analysis.
                Always consult certified professionals for final verification and safety decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
