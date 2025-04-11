import html2pdf from 'html2pdf.js';

export async function generatePDF(elementId: string, fileName: string = 'resume.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  const options = {
    margin: 10,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF');
  }
}
