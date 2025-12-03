import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AnalysisResult, InspectionCenter } from '@/types';

// jsPDF에 autoTable 타입 추가
declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

export const generatePDFReport = (
  analysisResult: AnalysisResult,
  images?: string[],
  inspectionCenters?: InspectionCenter[]
): void => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // ======================
  // 1. HEADER
  // ======================
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ASBESTOS ANALYSIS REPORT', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.text(`Report Generated: ${reportDate}`, pageWidth / 2, 32, { align: 'center' });

  yPosition = 55;
  doc.setTextColor(0, 0, 0);

  // ======================
  // 2. ANALYSIS RESULT
  // ======================
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ANALYSIS RESULT', margin, yPosition);
  yPosition += 10;

  // Status Box
  const statusColor =
    analysisResult.status === 'safe' ? [34, 197, 94] :
    analysisResult.status === 'danger' ? [239, 68, 68] :
    [251, 191, 36];

  const statusText =
    analysisResult.status === 'safe' ? 'SAFE - No Asbestos Detected' :
    analysisResult.status === 'danger' ? 'DANGER - Potential Asbestos Detected' :
    'UNCERTAIN - Further Inspection Required';

  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.setDrawColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 25, 3, 3, 'FD');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, pageWidth / 2, yPosition + 10, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Confidence Level: ${analysisResult.confidence}%`, pageWidth / 2, yPosition + 18, { align: 'center' });

  yPosition += 35;
  doc.setTextColor(0, 0, 0);

  // Analysis Message
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const messageLines = doc.splitTextToSize(analysisResult.message, pageWidth - 2 * margin);
  doc.text(messageLines, margin, yPosition);
  yPosition += messageLines.length * 6 + 10;

  // ======================
  // 3. DETECTED FEATURES
  // ======================
  if (analysisResult.detectedFeatures && analysisResult.detectedFeatures.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DETECTED FEATURES', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Convert Korean features to English
    const featureTranslations: Record<string, string> = {
      '섬유질 질감 감지됨': 'Fibrous texture detected',
      '색상 패턴 분석 완료': 'Color pattern analysis completed',
      '표면 특성 평가 완료': 'Surface characteristics evaluated',
    };

    analysisResult.detectedFeatures.forEach((feature) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }
      const translatedFeature = featureTranslations[feature] || feature;
      doc.setFillColor(239, 246, 255);
      doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 8, 1, 1, 'F');
      doc.setTextColor(37, 99, 235);
      doc.text(`✓`, margin + 3, yPosition + 5.5);
      doc.setTextColor(0, 0, 0);
      doc.text(`${translatedFeature}`, margin + 10, yPosition + 5.5);
      yPosition += 10;
    });
    yPosition += 5;
  }

  // ======================
  // 4. RECOMMENDATIONS
  // ======================
  if (analysisResult.recommendations && analysisResult.recommendations.length > 0) {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RECOMMENDATIONS', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Convert Korean recommendations to English
    const recTranslations: Record<string, string> = {
      '상세 분석 보고서를 검토하세요': 'Review the detailed analysis report',
      '우려되는 경우 전문 검사를 고려하세요': 'Consider professional inspection if concerned',
      '이 스크리닝 기록을 보관하세요': 'Keep this screening record for your files',
    };

    analysisResult.recommendations.forEach((rec, index) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }
      const translatedRec = recTranslations[rec] || rec;
      doc.text(`${index + 1}.`, margin + 2, yPosition);
      const recLines = doc.splitTextToSize(translatedRec, pageWidth - 2 * margin - 10);
      doc.text(recLines, margin + 10, yPosition);
      yPosition += recLines.length * 5 + 3;
    });
    yPosition += 5;
  }

  // ======================
  // 5. UPLOADED IMAGES
  // ======================
  if (images && images.length > 0) {
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ANALYZED IMAGES', margin, yPosition);
    yPosition += 10;

    const imgWidth = (pageWidth - 3 * margin) / 2;
    const imgHeight = imgWidth * 0.75;
    let xPosition = margin;

    images.forEach((imgSrc, index) => {
      if (yPosition + imgHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        xPosition = margin;
      }

      try {
        doc.addImage(imgSrc, 'JPEG', xPosition, yPosition, imgWidth, imgHeight);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`Image ${index + 1}`, xPosition + imgWidth / 2, yPosition + imgHeight + 5, { align: 'center' });
        doc.setTextColor(0, 0, 0);

        // 2개씩 배치
        if ((index + 1) % 2 === 0) {
          yPosition += imgHeight + 15;
          xPosition = margin;
        } else {
          xPosition += imgWidth + margin;
        }
      } catch (error) {
        console.error('Failed to add image to PDF:', error);
      }
    });

    yPosition += imgHeight + 15;
  }

  // ======================
  // 6. NEARBY INSPECTION CENTERS
  // ======================
  if (inspectionCenters && inspectionCenters.length > 0) {
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('NEARBY INSPECTION CENTERS', margin, yPosition);
    yPosition += 10;

    // Create table data
    const tableData = inspectionCenters.map(center => [
      center.name,
      center.address,
      `${center.distance} km`,
      center.phone,
      center.certified ? 'Yes' : 'No'
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Name', 'Address', 'Distance', 'Phone', 'Certified']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { left: margin, right: margin },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 60 },
        2: { cellWidth: 20 },
        3: { cellWidth: 30 },
        4: { cellWidth: 20 },
      },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // ======================
  // 7. DISCLAIMER
  // ======================
  const totalPages = doc.getNumberOfPages();

  // Add disclaimer on last page
  doc.setPage(totalPages);
  const disclaimerY = pageHeight - 35;

  doc.setFillColor(254, 242, 242);
  doc.rect(margin, disclaimerY - 5, pageWidth - 2 * margin, 25, 'F');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('IMPORTANT DISCLAIMER', margin + 5, disclaimerY);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(7);
  const disclaimer = doc.splitTextToSize(
    'This report is generated by an AI-powered screening tool and should NOT be considered as a definitive diagnosis. ' +
    'Asbestos can only be accurately identified through laboratory analysis by certified professionals. ' +
    'For proper asbestos identification and risk assessment, please consult with certified inspection centers listed in this report.',
    pageWidth - 2 * margin - 10
  );
  doc.text(disclaimer, margin + 5, disclaimerY + 5);

  // ======================
  // 8. PAGE NUMBERS & FOOTER
  // ======================
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    doc.text(
      'Generated by Asbestos Detector AI',
      margin,
      pageHeight - 10
    );
  }

  // ======================
  // 9. SAVE PDF
  // ======================
  const fileName = `asbestos-report-${new Date().getTime()}.pdf`;
  doc.save(fileName);
};
