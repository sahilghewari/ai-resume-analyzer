import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';

if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}
