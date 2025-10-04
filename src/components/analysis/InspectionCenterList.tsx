import React from 'react';
import { InspectionCenter } from '@types/index';
import { formatCurrency, formatDistance } from '@utils/formatters';
import { Card } from '@components/common';

interface InspectionCenterListProps {
  centers: InspectionCenter[];
}

export const InspectionCenterList: React.FC<InspectionCenterListProps> = ({ centers }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recommended Inspection Centers</h2>
      <p className="text-gray-600">
        We recommend getting a professional inspection for accurate results
      </p>

      <div className="grid gap-4">
        {centers.map((center) => (
          <Card key={center.id} className="hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{center.name}</h3>
                  <p className="text-sm text-gray-600">{center.address || center.location}</p>
                </div>
                <span className="text-blue-600 font-medium">
                  📍 {formatDistance(center.distance)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Estimated Cost</p>
                  <p className="font-semibold">
                    {formatCurrency(center.estimatedCost.min)} -{' '}
                    {formatCurrency(center.estimatedCost.max)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Inspection Time</p>
                  <p className="font-semibold">⏰ {center.inspectionTime}</p>
                </div>
              </div>

              {center.contact && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{center.contact}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
