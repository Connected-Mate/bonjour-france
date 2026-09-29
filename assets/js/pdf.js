// Local PDF text extraction with pdf.js (loaded on demand). The file never leaves the device.
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/6.3.289/pdf.min.mjs";
const WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/6.3.289/pdf.worker.min.mjs";

let libPromise = null;

async function lib() {
  if (!libPromise) {
    libPromise = import(PDFJS).then((m) => {
      m.GlobalWorkerOptions.workerSrc = WORKER;
      return m;
    }).catch((e) => {
      libPromise = null;
      throw e;
    });
  }
  return libPromise;
}

export async function extractPdfText(file, maxChars = 12000) {
  const pdfjs = await lib();
  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data, isEvalSupported: false, disableFontFace: true });
  const doc = await task.promise;
  let text = "";
  let truncated = false;
  try {
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((it) => ("str" in it ? it.str : "")).join(" ").replace(/\s+/g, " ").trim() + "\n\n";
      if (text.length > maxChars) {
        text = text.slice(0, maxChars);
        truncated = true;
        break;
      }
    }
    return { text: text.trim(), pages: doc.numPages, truncated };
  } finally {
    task.destroy();
  }
}
