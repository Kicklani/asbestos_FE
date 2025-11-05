import React, { useState } from 'react';
import { InspectionCenter } from '@/types';
import { Card, Badge, Button, Modal } from '@/components/common';

interface InspectionCenterListProps {
  centers: InspectionCenter[];
  userLocation?: { lat: number; lng: number };
}

export const InspectionCenterList: React.FC<InspectionCenterListProps> = ({
  centers,
}) => {
  const [selectedCenter, setSelectedCenter] = useState<InspectionCenter | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  if (centers.length === 0) {
    return (
      <Card className="text-center py-12 bg-white rounded-3xl shadow-2xl border-2 border-blue-100">
        <div className="text-gray-500">
          <svg className="w-20 h-20 mx-auto mb-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-2xl font-bold">검사소를 찾을 수 없습니다</p>
          <p className="text-base mt-3">위치를 조정하거나 고객 지원에 문의하세요</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">근처 검사소</h2>
        <p className="text-xl text-gray-600">
          근처에서 {centers.length}개의 인증된 검사소를 찾았습니다
        </p>
      </div>

      {centers.map((center) => (
        <Card
          key={center.id}
          hoverable
          onClick={() => setSelectedCenter(center)}
          className="cursor-pointer bg-white rounded-3xl shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Center Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                    {center.name}
                    {center.certified && (
                      <Badge variant="success" size="sm">인증</Badge>
                    )}
                  </h3>
                  <div className="flex items-center gap-2">
                    {renderRating(center.rating)}
                    <span className="text-base font-semibold text-gray-600">({center.rating}.0)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-base text-gray-600">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{center.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{center.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>{formatDistance(center.distance)} 거리</span>
                </div>
              </div>
            </div>

            {/* Pricing & Time */}
            <div className="md:text-right bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-600 mb-2">예상 비용</p>
                <p className="text-xl font-extrabold text-blue-600">
                  {formatCurrency(center.estimatedCost.min)} - {formatCurrency(center.estimatedCost.max)}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600 mb-2">검사 시간</p>
                <p className="text-base font-bold text-gray-900">{center.inspectionTime}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Detail Modal */}
      {selectedCenter && (
        <Modal
          isOpen={!!selectedCenter}
          onClose={() => setSelectedCenter(null)}
          title={selectedCenter.name}
          size="lg"
          footer={
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setSelectedCenter(null)} className="px-6 py-3 text-base font-bold rounded-xl">
                닫기
              </Button>
              <Button
                variant="primary"
                onClick={() => window.open(`tel:${selectedCenter.phone}`, '_self')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-base font-bold rounded-xl shadow-xl"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              >
                지금 전화하기
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {renderRating(selectedCenter.rating)}
              <span className="text-base font-semibold text-gray-600">({selectedCenter.rating}.0 평점)</span>
              {selectedCenter.certified && (
                <Badge variant="success" size="sm">인증</Badge>
              )}
            </div>

            <div className="space-y-4 text-base">
              <div>
                <p className="font-bold text-gray-700 mb-2">주소</p>
                <p className="text-gray-600">{selectedCenter.address}</p>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-2">전화번호</p>
                <p className="text-gray-600">{selectedCenter.phone}</p>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-2">거리</p>
                <p className="text-gray-600">{formatDistance(selectedCenter.distance)}</p>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-2">예상 비용</p>
                <p className="text-gray-600 font-semibold">
                  {formatCurrency(selectedCenter.estimatedCost.min)} - {formatCurrency(selectedCenter.estimatedCost.max)}
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-2">검사 시간</p>
                <p className="text-gray-600">{selectedCenter.inspectionTime}</p>
              </div>
            </div>

            {selectedCenter.coordinates && (
              <Button
                variant="outline"
                className="w-full px-6 py-4 text-lg font-bold rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${selectedCenter.coordinates!.lat},${selectedCenter.coordinates!.lng}`;
                  window.open(url, '_blank');
                }}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                }
              >
                지도에서 보기 🗺️
              </Button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
