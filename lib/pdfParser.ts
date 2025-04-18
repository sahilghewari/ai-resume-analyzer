import { getDocument } from 'pdfjs-dist';
import './pdfConfig';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  const PDFJS_VERSION = '3.11.174';
  const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
  (window as any).pdfjsWorker = workerSrc;
}

interface ParsingStats {
  charCount: number;
  lineCount: number;
  wordCount: number;
}

function analyzeText(text: string): ParsingStats {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const words = text.split(/\s+/).filter(word => word.trim().length > 0);
  
  return {
    charCount: text.length,
    lineCount: lines.length,
    wordCount: words.length
  };
}

function validateExtractedText(text: string): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  const stats = analyzeText(text);

  console.log('Text Statistics:', stats);

  if (stats.charCount < 100) {
    issues.push('Text is too short (less than 100 characters)');
  }
  if (stats.lineCount < 5) {
    issues.push('Too few lines detected (less than 5 lines)');
  }
  if (stats.wordCount < 20) {
    issues.push('Too few words detected (less than 20 words)');
  }
  if (text.includes('�')) {
    issues.push('Contains invalid characters');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document
    const loadingTask = getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    if (fullText.trim().length < 50) {
      throw new Error('Extracted text is too short - possible scanned PDF');
    }

    return fullText;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Is it a scanned document?');
  }
}
