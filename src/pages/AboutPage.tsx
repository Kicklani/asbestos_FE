import React from 'react';
import { Card } from '@components/common';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Asbestos Detector</h1>
        <p className="text-xl text-gray-600">
          AI-powered preliminary screening for asbestos in stones
        </p>
      </div>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          We aim to make asbestos detection more accessible and affordable by providing
          an AI-powered preliminary screening service. Our goal is to help people identify
          potentially dangerous materials quickly and efficiently, while reducing unnecessary
          costs for professional inspections.
        </p>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Step 1: Basic Screening (AI)</h3>
            <p className="text-gray-700">
              Upload a photo of your stone and our AI analyzes it to provide one of three results:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>🟢 Green Light (70%): Definitely safe, no asbestos detected</li>
              <li>🟡 Yellow Light (25%): Uncertain, additional information needed</li>
              <li>🔴 Red Light (5%): Potential danger, professional inspection recommended</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Step 2: Detailed Analysis</h3>
            <p className="text-gray-700">
              For yellow or red results, we ask for additional information such as multiple
              angles, location, and size to improve accuracy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Step 3: Professional Connection</h3>
            <p className="text-gray-700">
              If uncertainty remains, we guide you to certified inspection centers with
              estimated costs and timeframes.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-yellow-50">
        <h2 className="text-2xl font-semibold mb-4">Important Disclaimer</h2>
        <p className="text-gray-700 leading-relaxed">
          This service provides preliminary screening only and should not be considered
          a substitute for professional inspection. Always consult certified professionals
          for final verification and safety decisions. We are not liable for any decisions
          made based on our AI analysis.
        </p>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">Technology</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our platform uses advanced machine learning models trained on thousands of
          stone samples to identify potential asbestos-containing materials. The system
          analyzes visual patterns, textures, and other characteristics to provide
          accurate preliminary assessments.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Built with React, TypeScript, and state-of-the-art AI technologies to ensure
          fast, reliable, and user-friendly experience.
        </p>
      </Card>
    </div>
  );
};
