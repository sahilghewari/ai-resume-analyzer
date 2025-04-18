import { getDocument, PDFDocumentProxy } from 'pdfjs-dist';
import './pdfConfig';

export async function extractPDFText(file: File): Promise<string> {
  try {
    console.log('Starting PDF extraction:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    
    const textContent = await extractAllPages(pdf);
    console.log('Extracted text length:', textContent.length);
    
    if (textContent.length < 100) {
      throw new Error('Insufficient text content - possible scanned PDF');
    }
    
    return textContent;
  } catch (error) {
    console.error('PDF extraction failed:', error);
    throw new Error(`PDF parsing failed: ${error.message}`);
  }
}

async function extractAllPages(pdf: PDFDocumentProxy): Promise<string> {
  const pageTexts: string[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => item.str)
      .join(' ');
    pageTexts.push(text);
  }
  
  return pageTexts.join('\n');
}
