import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@components/common';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          AI-Powered Asbestos Detection
        </h1>
        <p className="text-xl text-gray-600">
          Fast, accurate, and affordable screening for asbestos in stones
        </p>
      </div>

      <Card className="text-center">
        <div className="space-y-6">
          <div className="text-6xl">🔬</div>
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p className="text-gray-600">
            Upload a photo of your stone and get instant AI analysis
          </p>
          <Button onClick={() => navigate('/analysis')} variant="primary" className="text-lg px-8 py-4">
            Start Analysis
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center space-y-3">
            <div className="text-4xl">🟢</div>
            <h3 className="font-semibold">70% Instant Relief</h3>
            <p className="text-sm text-gray-600">
              Most cases are identified as safe immediately - no need for expensive testing
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center space-y-3">
            <div className="text-4xl">🔴</div>
            <h3 className="font-semibold">5% Immediate Alert</h3>
            <p className="text-sm text-gray-600">
              Dangerous cases are flagged right away for immediate professional inspection
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center space-y-3">
            <div className="text-4xl">🟡</div>
            <h3 className="font-semibold">25% Further Analysis</h3>
            <p className="text-sm text-gray-600">
              Uncertain cases get additional screening before recommending professional testing
            </p>
          </div>
        </Card>
      </div>

      <Card className="bg-blue-50">
        <h3 className="text-xl font-semibold mb-4">Why Choose Our Service?</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Save money - Only 25% need professional inspection instead of 100%</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Instant results - Get preliminary analysis in seconds</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Expert guidance - Connected to certified inspection centers when needed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Peace of mind - Know immediately if you need to worry</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
