"use client";

import { useState } from "react";
import { PDFDocument, degrees, StandardFonts, rgb } from "pdf-lib";
import { parsePageSelection, safeTextFromError, toPdfBlob } from "@/lib/toolUtils";

type FileState = {
  file: File | null;
  downloadUrl: string;
  error: string;
};

const initialFileState: FileState = {
  file: null,
  downloadUrl: "",
  error: ""
};

type TextPosition = "top-left" | "top-center" | "center" | "bottom-left" | "bottom-center";

const MARGIN = 40;

function getTextCoords(
  pageWidth: number,
  pageHeight: number,
  textWidth: number,
  fontSize: number,
  pos: TextPosition
): { x: number; y: number } {
  switch (pos) {
    case "top-left":
      return { x: MARGIN, y: pageHeight - MARGIN - fontSize };
    case "top-center":
      return { x: (pageWidth - textWidth) / 2, y: pageHeight - MARGIN - fontSize };
    case "center":
      return { x: (pageWidth - textWidth) / 2, y: (pageHeight - fontSize) / 2 };
    case "bottom-left":
      return { x: MARGIN, y: MARGIN };
    case "bottom-center":
      return { x: (pageWidth - textWidth) / 2, y: MARGIN };
    default:
      return { x: MARGIN, y: pageHeight - MARGIN - fontSize };
  }
}

export function PdfTools() {
  const [pdfMergeFiles, setPdfMergeFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");
  const [pdfMergeError, setPdfMergeError] = useState("");

  const [extractPdfState, setExtractPdfState] = useState<FileState>(initialFileState);
  const [extractSelection, setExtractSelection] = useState("1");

  const [rotatePdfState, setRotatePdfState] = useState<FileState>(initialFileState);
  const [rotation, setRotation] = useState(90);

  const [addTextState, setAddTextState] = useState<FileState>(initialFileState);
  const [addTextContent, setAddTextContent] = useState("");
  const [addTextPage, setAddTextPage] = useState("1");
  const [addTextSize, setAddTextSize] = useState(14);
  const [addTextPosition, setAddTextPosition] = useState<TextPosition>("top-center");
  const [addTextAllPages, setAddTextAllPages] = useState(false);

  const mergePdfs = async () => {
    if (pdfMergeFiles.length < 2) {
      setPdfMergeError("Select at least two PDF files.");
      return;
    }
    setPdfMergeError("");
    try {
      const merged = await PDFDocument.create();
      for (const file of pdfMergeFiles) {
        const bytes = await file.arrayBuffer();
        const source = await PDFDocument.load(bytes);
        const copiedPages = await merged.copyPages(source, source.getPageIndices());
        copiedPages.forEach((page) => merged.addPage(page));
      }
      const outputBytes = await merged.save();
      if (mergedPdfUrl) URL.revokeObjectURL(mergedPdfUrl);
      setMergedPdfUrl(URL.createObjectURL(toPdfBlob(outputBytes)));
    } catch (error) {
      setPdfMergeError(`Merge failed: ${safeTextFromError(error)}`);
    }
  };

  const extractPdfPages = async () => {
    if (!extractPdfState.file) {
      setExtractPdfState((prev) => ({ ...prev, error: "Select a PDF first." }));
      return;
    }
    try {
      const inputBytes = await extractPdfState.file.arrayBuffer();
      const source = await PDFDocument.load(inputBytes);
      const selectedPages = parsePageSelection(extractSelection, source.getPageCount());
      const out = await PDFDocument.create();
      const copied = await out.copyPages(source, selectedPages);
      copied.forEach((page) => out.addPage(page));
      const outputBytes = await out.save();
      if (extractPdfState.downloadUrl) URL.revokeObjectURL(extractPdfState.downloadUrl);
      setExtractPdfState((prev) => ({
        ...prev,
        downloadUrl: URL.createObjectURL(toPdfBlob(outputBytes)),
        error: ""
      }));
    } catch (error) {
      setExtractPdfState((prev) => ({ ...prev, error: `Extraction failed: ${safeTextFromError(error)}` }));
    }
  };

  const rotatePdfPages = async () => {
    if (!rotatePdfState.file) {
      setRotatePdfState((prev) => ({ ...prev, error: "Select a PDF first." }));
      return;
    }
    try {
      const inputBytes = await rotatePdfState.file.arrayBuffer();
      const doc = await PDFDocument.load(inputBytes);
      doc.getPages().forEach((page) => page.setRotation(degrees(rotation)));
      const outputBytes = await doc.save();
      if (rotatePdfState.downloadUrl) URL.revokeObjectURL(rotatePdfState.downloadUrl);
      setRotatePdfState((prev) => ({
        ...prev,
        downloadUrl: URL.createObjectURL(toPdfBlob(outputBytes)),
        error: ""
      }));
    } catch (error) {
      setRotatePdfState((prev) => ({ ...prev, error: `Rotate failed: ${safeTextFromError(error)}` }));
    }
  };

  const addTextToPdf = async () => {
    if (!addTextState.file || !addTextContent.trim()) {
      setAddTextState((prev) => ({ ...prev, error: "Select a PDF and enter text." }));
      return;
    }
    setAddTextState((prev) => ({ ...prev, error: "" }));
    try {
      const inputBytes = await addTextState.file.arrayBuffer();
      const doc = await PDFDocument.load(inputBytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const pageIndices = addTextAllPages
        ? pages.map((_, i) => i)
        : [Math.max(0, parseInt(addTextPage, 10) - 1)];

      for (const i of pageIndices) {
        if (i >= pages.length) continue;
        const page = pages[i];
        const w = page.getWidth();
        const h = page.getHeight();
        const textWidth = font.widthOfTextAtSize(addTextContent.trim(), addTextSize);
        const { x, y } = getTextCoords(w, h, textWidth, addTextSize, addTextPosition);
        page.drawText(addTextContent.trim(), {
          x,
          y,
          size: addTextSize,
          font,
          color: rgb(0.1, 0.1, 0.1)
        });
      }

      const outputBytes = await doc.save();
      if (addTextState.downloadUrl) URL.revokeObjectURL(addTextState.downloadUrl);
      setAddTextState((prev) => ({
        ...prev,
        downloadUrl: URL.createObjectURL(toPdfBlob(outputBytes)),
        error: ""
      }));
    } catch (error) {
      setAddTextState((prev) => ({ ...prev, error: `Add text failed: ${safeTextFromError(error)}` }));
    }
  };

  return (
    <div className="pdf-tools-wrap">
      <p className="pdf-tools-note">
        Client-side only: files never leave your device.
      </p>

      <section className="pdf-tool-card">
        <h3 className="pdf-tool-title">Merge PDFs</h3>
        <p className="pdf-tool-desc">Combine multiple PDFs into one file.</p>
        <div className="pdf-tool-field">
          <label htmlFor="pdfMerge">Select PDFs</label>
          <input
            id="pdfMerge"
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => setPdfMergeFiles(Array.from(e.target.files ?? []))}
          />
        </div>
        <div className="pdf-tool-actions">
          <button type="button" className="pdf-tool-btn pdf-tool-btn-primary" onClick={mergePdfs}>
            Merge files
          </button>
          <a
            className="pdf-tool-download"
            href={mergedPdfUrl}
            download="merged.pdf"
            aria-disabled={!mergedPdfUrl}
          >
            Download merged PDF
          </a>
        </div>
        {mergedPdfUrl && (
          <div className="pdf-tool-preview">
            <p className="pdf-tool-preview-label">Preview</p>
            <iframe src={mergedPdfUrl} title="Merged PDF preview" className="pdf-preview-iframe" />
          </div>
        )}
        {pdfMergeError && <p className="pdf-tool-error">{pdfMergeError}</p>}
      </section>

      <section className="pdf-tool-card">
        <h3 className="pdf-tool-title">Extract pages</h3>
        <p className="pdf-tool-desc">Keep only the pages you need (e.g. 1,3-5).</p>
        <div className="pdf-tool-field">
          <label htmlFor="pdfExtractFile">PDF file</label>
          <input
            id="pdfExtractFile"
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setExtractPdfState({ file: e.target.files?.[0] ?? null, downloadUrl: "", error: "" })
            }
          />
        </div>
        <div className="pdf-tool-field">
          <label htmlFor="pageSelection">Pages</label>
          <input
            id="pageSelection"
            value={extractSelection}
            onChange={(e) => setExtractSelection(e.target.value)}
            placeholder="e.g. 1,3-5"
          />
        </div>
        <div className="pdf-tool-actions">
          <button type="button" className="pdf-tool-btn pdf-tool-btn-primary" onClick={extractPdfPages}>
            Extract pages
          </button>
          <a
            className="pdf-tool-download"
            href={extractPdfState.downloadUrl}
            download="extracted-pages.pdf"
            aria-disabled={!extractPdfState.downloadUrl}
          >
            Download extracted PDF
          </a>
        </div>
        {extractPdfState.downloadUrl && (
          <div className="pdf-tool-preview">
            <p className="pdf-tool-preview-label">Preview</p>
            <iframe src={extractPdfState.downloadUrl} title="Extracted PDF preview" className="pdf-preview-iframe" />
          </div>
        )}
        {extractPdfState.error && <p className="pdf-tool-error">{extractPdfState.error}</p>}
      </section>

      <section className="pdf-tool-card">
        <h3 className="pdf-tool-title">Rotate pages</h3>
        <p className="pdf-tool-desc">Rotate every page of a PDF.</p>
        <div className="pdf-tool-field">
          <label htmlFor="pdfRotateFile">PDF file</label>
          <input
            id="pdfRotateFile"
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setRotatePdfState({ file: e.target.files?.[0] ?? null, downloadUrl: "", error: "" })
            }
          />
        </div>
        <div className="pdf-tool-field">
          <label htmlFor="rotation">Rotation</label>
          <select
            id="rotation"
            value={rotation}
            onChange={(e) => setRotation(Number.parseInt(e.target.value, 10))}
          >
            <option value={90}>90° clockwise</option>
            <option value={180}>180°</option>
            <option value={270}>270° clockwise</option>
          </select>
        </div>
        <div className="pdf-tool-actions">
          <button type="button" className="pdf-tool-btn pdf-tool-btn-primary" onClick={rotatePdfPages}>
            Rotate
          </button>
          <a
            className="pdf-tool-download"
            href={rotatePdfState.downloadUrl}
            download="rotated.pdf"
            aria-disabled={!rotatePdfState.downloadUrl}
          >
            Download rotated PDF
          </a>
        </div>
        {rotatePdfState.downloadUrl && (
          <div className="pdf-tool-preview">
            <p className="pdf-tool-preview-label">Preview</p>
            <iframe src={rotatePdfState.downloadUrl} title="Rotated PDF preview" className="pdf-preview-iframe" />
          </div>
        )}
        {rotatePdfState.error && <p className="pdf-tool-error">{rotatePdfState.error}</p>}
      </section>

      <section className="pdf-tool-card pdf-tool-card-highlight">
        <h3 className="pdf-tool-title">Add text to PDF</h3>
        <p className="pdf-tool-desc">
          Overlay text on your PDF (watermarks, labels, notes). Text is drawn on top of the existing content.
        </p>
        <div className="pdf-tool-field">
          <label htmlFor="pdfAddTextFile">PDF file</label>
          <input
            id="pdfAddTextFile"
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setAddTextState({ file: e.target.files?.[0] ?? null, downloadUrl: "", error: "" })
            }
          />
        </div>
        <div className="pdf-tool-field">
          <label htmlFor="addTextContent">Text to add</label>
          <input
            id="addTextContent"
            type="text"
            value={addTextContent}
            onChange={(e) => setAddTextContent(e.target.value)}
            placeholder="e.g. DRAFT or Page title"
          />
        </div>
        <div className="pdf-tool-row">
          <div className="pdf-tool-field">
            <label htmlFor="addTextPage">Page number</label>
            <input
              id="addTextPage"
              type="text"
              value={addTextPage}
              onChange={(e) => setAddTextPage(e.target.value)}
              disabled={addTextAllPages}
              placeholder="1"
            />
          </div>
          <label className="pdf-tool-check">
            <input
              type="checkbox"
              checked={addTextAllPages}
              onChange={(e) => setAddTextAllPages(e.target.checked)}
            />
            All pages
          </label>
        </div>
        <div className="pdf-tool-row">
          <div className="pdf-tool-field">
            <label htmlFor="addTextSize">Font size</label>
            <select
              id="addTextSize"
              value={addTextSize}
              onChange={(e) => setAddTextSize(Number(e.target.value))}
            >
              {[10, 12, 14, 18, 24, 32, 48].map((n) => (
                <option key={n} value={n}>{n}pt</option>
              ))}
            </select>
          </div>
          <div className="pdf-tool-field">
            <label htmlFor="addTextPosition">Position</label>
            <select
              id="addTextPosition"
              value={addTextPosition}
              onChange={(e) => setAddTextPosition(e.target.value as TextPosition)}
            >
              <option value="top-left">Top left</option>
              <option value="top-center">Top center</option>
              <option value="center">Center</option>
              <option value="bottom-left">Bottom left</option>
              <option value="bottom-center">Bottom center</option>
            </select>
          </div>
        </div>
        <div className="pdf-tool-actions">
          <button type="button" className="pdf-tool-btn pdf-tool-btn-primary" onClick={addTextToPdf}>
            Add text
          </button>
          <a
            className="pdf-tool-download"
            href={addTextState.downloadUrl}
            download="pdf-with-text.pdf"
            aria-disabled={!addTextState.downloadUrl}
          >
            Download PDF
          </a>
        </div>
        {addTextState.downloadUrl && (
          <div className="pdf-tool-preview">
            <p className="pdf-tool-preview-label">Preview — check the result below, then download if it looks good</p>
            <iframe src={addTextState.downloadUrl} title="PDF with added text preview" className="pdf-preview-iframe" />
          </div>
        )}
        {addTextState.error && <p className="pdf-tool-error">{addTextState.error}</p>}
      </section>
    </div>
  );
}
