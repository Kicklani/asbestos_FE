import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@/components/common';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Asbestos Detector
            </h1>
            <p className="text-xl text-gray-600">
              AI-powered preliminary screening for safer environments
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Asbestos exposure remains a serious health concern worldwide. Our mission is to make
              preliminary asbestos screening accessible, fast, and affordable for everyone through
              the power of artificial intelligence.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that early detection and awareness are key to preventing asbestos-related
              health issues. By providing instant preliminary results, we empower individuals and
              organizations to make informed decisions about potential asbestos risks.
            </p>
          </Card>

          {/* Technology */}
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Advanced Machine Learning
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our AI model is trained on thousands of images of asbestos-containing materials
                  and safe materials. It uses deep learning techniques to identify visual patterns
                  and characteristics associated with asbestos.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  3-Tier Classification System
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span><strong className="text-green-700">Green (Safe):</strong> Material appears to be free of asbestos based on visual analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span><strong className="text-yellow-700">Yellow (Uncertain):</strong> Additional information needed for accurate determination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span><strong className="text-red-700">Red (Danger):</strong> Material shows characteristics commonly associated with asbestos</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Modern Tech Stack
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Built with cutting-edge technologies for optimal performance and user experience:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* How to Use */}
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex items-center justify-center">1</span>
                  <h3 className="text-lg font-semibold text-gray-900">Upload Your Image</h3>
                </div>
                <p className="text-gray-700 ml-11">
                  Take a clear photo of the material you want to analyze. Make sure the image is
                  well-lit and shows the material's texture and color clearly.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex items-center justify-center">2</span>
                  <h3 className="text-lg font-semibold text-gray-900">Get Instant Results</h3>
                </div>
                <p className="text-gray-700 ml-11">
                  Our AI analyzes your image in seconds and provides a preliminary assessment with
                  a confidence level.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex items-center justify-center">3</span>
                  <h3 className="text-lg font-semibold text-gray-900">Follow Recommendations</h3>
                </div>
                <p className="text-gray-700 ml-11">
                  Based on the results, we'll provide next steps. For uncertain or dangerous results,
                  we'll help you find certified inspection centers nearby.
                </p>
              </div>
            </div>
          </Card>

          {/* Limitations & Disclaimer */}
          <Card className="mb-8 border-2 border-yellow-300 bg-yellow-50">
            <div className="flex gap-4">
              <svg className="w-8 h-8 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h2 className="text-xl font-bold text-yellow-900 mb-3">Important Disclaimer</h2>
                <div className="space-y-2 text-yellow-900">
                  <p className="font-semibold">This is a preliminary screening tool only.</p>
                  <ul className="space-y-1 ml-4">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Results are not a substitute for professional laboratory analysis</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Visual inspection alone cannot definitively identify asbestos</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Always consult certified professionals for final verification</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Do not handle suspected asbestos materials without proper training</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>We are not liable for any decisions made based on our analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6">
              Start your free preliminary analysis now
            </p>
            <Link to="/analysis">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Analysis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
