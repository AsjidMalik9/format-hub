"use client";

import { marked } from "marked";
import { ChangeEvent, useMemo, useState } from "react";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { format as sqlFormat } from "sql-formatter";
import { PDFDocument, degrees } from "pdf-lib";

function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
}

function normalizeSpaces(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .join("\n");
}

function safeTextFromError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected error";
}

function toPdfBlob(bytes: Uint8Array): Blob {
  const normalized = new Uint8Array(bytes);
  return new Blob([normalized.buffer], { type: "application/pdf" });
}

function parsePageSelection(input: string, totalPages: number): number[] {
  const values = new Set<number>();
  const chunks = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    if (chunk.includes("-")) {
      const [startRaw, endRaw] = chunk.split("-").map((v) => Number.parseInt(v.trim(), 10));
      if (!Number.isFinite(startRaw) || !Number.isFinite(endRaw)) {
        throw new Error(`Invalid range: ${chunk}`);
      }
      const start = Math.min(startRaw, endRaw);
      const end = Math.max(startRaw, endRaw);
      if (start < 1 || end > totalPages) {
        throw new Error(`Range ${chunk} is outside 1-${totalPages}`);
      }
      for (let page = start; page <= end; page += 1) {
        values.add(page - 1);
      }
    } else {
      const page = Number.parseInt(chunk, 10);
      if (!Number.isFinite(page) || page < 1 || page > totalPages) {
        throw new Error(`Page ${chunk} is outside 1-${totalPages}`);
      }
      values.add(page - 1);
    }
  }

  return [...values].sort((a, b) => a - b);
}

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

export function ToolHub() {
  const [textInput, setTextInput] = useState("");
  const [structuredInput, setStructuredInput] = useState("");
  const [structuredOutput, setStructuredOutput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [urlOutput, setUrlOutput] = useState("");
  const [sqlInput, setSqlInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [regexPattern, setRegexPattern] = useState("");
  const [regexFlags, setRegexFlags] = useState("g");
  const [regexInput, setRegexInput] = useState("");
  const [regexOutput, setRegexOutput] = useState("");
  const [markdownInput, setMarkdownInput] = useState("# Welcome\n\nWrite markdown here.");
  const [markdownOutput, setMarkdownOutput] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageQuality, setImageQuality] = useState(0.8);
  const [compressedImageUrl, setCompressedImageUrl] = useState("");
  const [imageInfo, setImageInfo] = useState("");
  const [imageError, setImageError] = useState("");

  const [pdfMergeFiles, setPdfMergeFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");
  const [pdfMergeError, setPdfMergeError] = useState("");

  const [extractPdfState, setExtractPdfState] = useState<FileState>(initialFileState);
  const [extractSelection, setExtractSelection] = useState("1");

  const [rotatePdfState, setRotatePdfState] = useState<FileState>(initialFileState);
  const [rotation, setRotation] = useState(90);

  const textStats = useMemo(() => {
    const trimmed = textInput.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = textInput.length;
    const lines = textInput ? textInput.split("\n").length : 0;
    return { words, chars, lines };
  }, [textInput]);

  const runMarkdown = () => {
    const html = marked.parse(markdownInput) as string;
    setMarkdownOutput(html);
  };

  const runRegex = () => {
    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = [...regexInput.matchAll(regex)];
      if (!matches.length) {
        setRegexOutput("No matches.");
        return;
      }
      const output = matches
        .map((match, idx) => {
          const groups = match.groups ? ` groups=${JSON.stringify(match.groups)}` : "";
          return `${idx + 1}. "${match[0]}" at index ${match.index}${groups}`;
        })
        .join("\n");
      setRegexOutput(output);
    } catch (error) {
      setRegexOutput(`Error: ${safeTextFromError(error)}`);
    }
  };

  const formatJson = () => {
    try {
      setStructuredOutput(JSON.stringify(JSON.parse(structuredInput), null, 2));
    } catch (error) {
      setStructuredOutput(`Error: ${safeTextFromError(error)}`);
    }
  };

  const minifyJson = () => {
    try {
      setStructuredOutput(JSON.stringify(JSON.parse(structuredInput)));
    } catch (error) {
      setStructuredOutput(`Error: ${safeTextFromError(error)}`);
    }
  };

  const formatXml = () => {
    try {
      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
      const builder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        format: true,
        suppressEmptyNode: true
      });
      const parsed = parser.parse(structuredInput);
      setStructuredOutput(builder.build(parsed));
    } catch (error) {
      setStructuredOutput(`Error: ${safeTextFromError(error)}`);
    }
  };

  const formatSqlInput = () => {
    try {
      setSqlOutput(sqlFormat(sqlInput, { language: "sql" }));
    } catch (error) {
      setSqlOutput(`Error: ${safeTextFromError(error)}`);
    }
  };

  const minifySqlInput = () => {
    setSqlOutput(sqlInput.replace(/\s+/g, " ").trim());
  };

  const handleImageCompress = async () => {
    if (!imageFile) {
      setImageError("Please choose an image file first.");
      return;
    }

    setImageError("");
    const sourceUrl = URL.createObjectURL(imageFile);
    const image = new Image();
    image.src = sourceUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setImageError("Canvas is unavailable in this browser.");
      URL.revokeObjectURL(sourceUrl);
      return;
    }
    ctx.drawImage(image, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), "image/jpeg", imageQuality);
    });

    URL.revokeObjectURL(sourceUrl);
    if (!blob) {
      setImageError("Could not compress this image.");
      return;
    }

    if (compressedImageUrl) {
      URL.revokeObjectURL(compressedImageUrl);
    }
    const outputUrl = URL.createObjectURL(blob);
    setCompressedImageUrl(outputUrl);

    const before = (imageFile.size / 1024).toFixed(1);
    const after = (blob.size / 1024).toFixed(1);
    const saved = (((imageFile.size - blob.size) / imageFile.size) * 100).toFixed(1);
    setImageInfo(`Original: ${before} KB | Compressed: ${after} KB | Saved: ${saved}%`);
  };

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
        const pageIndexes = source.getPageIndices();
        const copiedPages = await merged.copyPages(source, pageIndexes);
        copiedPages.forEach((page) => merged.addPage(page));
      }
      const outputBytes = await merged.save();
      if (mergedPdfUrl) {
        URL.revokeObjectURL(mergedPdfUrl);
      }
      const url = URL.createObjectURL(toPdfBlob(outputBytes));
      setMergedPdfUrl(url);
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

      if (extractPdfState.downloadUrl) {
        URL.revokeObjectURL(extractPdfState.downloadUrl);
      }

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
      if (rotatePdfState.downloadUrl) {
        URL.revokeObjectURL(rotatePdfState.downloadUrl);
      }
      setRotatePdfState((prev) => ({
        ...prev,
        downloadUrl: URL.createObjectURL(toPdfBlob(outputBytes)),
        error: ""
      }));
    } catch (error) {
      setRotatePdfState((prev) => ({ ...prev, error: `Rotate failed: ${safeTextFromError(error)}` }));
    }
  };

  const previewHtml = markdownOutput || (marked.parse(markdownInput) as string);

  return (
    <main className="container">
      <header className="hero">
        <h1>FormatHub</h1>
        <p>
          Search-friendly free tools website with text utilities, JSON/XML formatting, URL encode/decode,
          SQL formatting, regex testing, markdown conversion, image compression, and PDF editor features.
        </p>
      </header>

      <section className="grid">
        <article className="card">
          <h2>Text Tools</h2>
          <div className="field">
            <label htmlFor="textInput">Input text</label>
            <textarea id="textInput" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
          </div>
          <div className="stats">
            <span>Words: {textStats.words}</span>
            <span>Characters: {textStats.chars}</span>
            <span>Lines: {textStats.lines}</span>
          </div>
          <div className="button-row">
            <button onClick={() => setTextInput(textInput.toUpperCase())}>Uppercase</button>
            <button onClick={() => setTextInput(textInput.toLowerCase())}>Lowercase</button>
            <button onClick={() => setTextInput(toTitleCase(textInput))}>Title Case</button>
            <button onClick={() => setTextInput(normalizeSpaces(textInput))}>Trim Spaces</button>
          </div>
        </article>

        <article className="card">
          <h2>JSON / XML Formatter</h2>
          <div className="field">
            <label htmlFor="structuredInput">Input</label>
            <textarea
              id="structuredInput"
              value={structuredInput}
              onChange={(e) => setStructuredInput(e.target.value)}
              placeholder="Paste JSON or XML here"
            />
          </div>
          <div className="button-row">
            <button onClick={formatJson}>Format JSON</button>
            <button onClick={minifyJson}>Minify JSON</button>
            <button onClick={formatXml}>Format XML</button>
          </div>
          <pre className="output">{structuredOutput}</pre>
        </article>

        <article className="card">
          <h2>URL Encoder / Decoder</h2>
          <div className="field">
            <label htmlFor="urlInput">Text or URL</label>
            <textarea id="urlInput" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
          </div>
          <div className="button-row">
            <button
              onClick={() => {
                try {
                  setUrlOutput(encodeURIComponent(urlInput));
                } catch (error) {
                  setUrlOutput(`Error: ${safeTextFromError(error)}`);
                }
              }}
            >
              Encode
            </button>
            <button
              onClick={() => {
                try {
                  setUrlOutput(decodeURIComponent(urlInput));
                } catch (error) {
                  setUrlOutput(`Error: ${safeTextFromError(error)}`);
                }
              }}
            >
              Decode
            </button>
          </div>
          <pre className="output">{urlOutput}</pre>
        </article>

        <article className="card">
          <h2>SQL Formatter</h2>
          <div className="field">
            <label htmlFor="sqlInput">SQL query</label>
            <textarea id="sqlInput" value={sqlInput} onChange={(e) => setSqlInput(e.target.value)} />
          </div>
          <div className="button-row">
            <button onClick={formatSqlInput}>Format SQL</button>
            <button onClick={minifySqlInput}>Minify SQL</button>
          </div>
          <pre className="output">{sqlOutput}</pre>
        </article>

        <article className="card">
          <h2>Regex Tester</h2>
          <div className="field">
            <label htmlFor="regexPattern">Pattern</label>
            <input
              id="regexPattern"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              placeholder="\\b\\w+@\\w+\\.\\w+\\b"
            />
          </div>
          <div className="field">
            <label htmlFor="regexFlags">Flags</label>
            <input id="regexFlags" value={regexFlags} onChange={(e) => setRegexFlags(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="regexInput">Text</label>
            <textarea id="regexInput" value={regexInput} onChange={(e) => setRegexInput(e.target.value)} />
          </div>
          <button onClick={runRegex}>Run Regex</button>
          <pre className="output">{regexOutput}</pre>
        </article>

        <article className="card">
          <h2>Markdown to HTML</h2>
          <div className="field">
            <label htmlFor="markdownInput">Markdown</label>
            <textarea
              id="markdownInput"
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
              placeholder="# Markdown"
            />
          </div>
          <button onClick={runMarkdown}>Convert</button>
          <div className="field">
            <label htmlFor="markdownOutput">HTML output</label>
            <textarea id="markdownOutput" value={markdownOutput} readOnly />
          </div>
          <div className="field">
            <label>Preview</label>
            <div className="preview" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </article>

        <article className="card">
          <h2>Image Compressor</h2>
          <div className="field">
            <label htmlFor="imageInput">Image file</label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="field">
            <label htmlFor="qualityInput">Quality: {imageQuality.toFixed(2)}</label>
            <input
              id="qualityInput"
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={imageQuality}
              onChange={(e) => setImageQuality(Number.parseFloat(e.target.value))}
            />
          </div>
          <button onClick={handleImageCompress}>Compress</button>
          {imageInfo ? <p className="muted">{imageInfo}</p> : null}
          {imageError ? <p className="error">{imageError}</p> : null}
          <a className="download" href={compressedImageUrl} download="compressed.jpg" aria-disabled={!compressedImageUrl}>
            Download compressed image
          </a>
        </article>

        <article className="card">
          <h2>PDF Editor Tools</h2>
          <p className="muted">Client-side merge, extract pages, and rotate pages without server upload.</p>

          <div className="split">
            <h3>Merge PDFs</h3>
            <div className="field">
              <label htmlFor="pdfMerge">Select multiple PDFs</label>
              <input
                id="pdfMerge"
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => setPdfMergeFiles(Array.from(e.target.files ?? []))}
              />
            </div>
            <button onClick={mergePdfs}>Merge Files</button>
            {pdfMergeError ? <p className="error">{pdfMergeError}</p> : null}
            <a className="download" href={mergedPdfUrl} download="merged.pdf" aria-disabled={!mergedPdfUrl}>
              Download merged PDF
            </a>
          </div>

          <div className="split">
            <h3>Extract PDF Pages</h3>
            <div className="field">
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
            <div className="field">
              <label htmlFor="pageSelection">Page selection (e.g., 1,3-5)</label>
              <input
                id="pageSelection"
                value={extractSelection}
                onChange={(e) => setExtractSelection(e.target.value)}
              />
            </div>
            <button onClick={extractPdfPages}>Extract Pages</button>
            {extractPdfState.error ? <p className="error">{extractPdfState.error}</p> : null}
            <a
              className="download"
              href={extractPdfState.downloadUrl}
              download="extracted-pages.pdf"
              aria-disabled={!extractPdfState.downloadUrl}
            >
              Download extracted PDF
            </a>
          </div>

          <div className="split">
            <h3>Rotate PDF Pages</h3>
            <div className="field">
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
            <div className="field">
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
            <button onClick={rotatePdfPages}>Rotate Pages</button>
            {rotatePdfState.error ? <p className="error">{rotatePdfState.error}</p> : null}
            <a
              className="download"
              href={rotatePdfState.downloadUrl}
              download="rotated.pdf"
              aria-disabled={!rotatePdfState.downloadUrl}
            >
              Download rotated PDF
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
