"use client";
import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import type { ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import {
  Plus as ZoomInIcon,
  Minus as ZoomOutIcon,
  Printer as PrintIcon,
} from "lucide-react";


interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <div className="relative flex flex-col items-center justify-center h-[90svh] w-full p-2 bg-[#0c0c0c7e] border border-gray-300 rounded-lg">
      {/* Floating Toolbar */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-lg border border-gray-300 bg-[#0c0c0c] backdrop-blur-lg p-2 shadow-lg">
        <Toolbar>
          {(props: ToolbarSlot) => {
            const { CurrentPageInput, NumberOfPages, Print, ZoomIn, ZoomOut } = props;

            return (
              <div className="flex items-center gap-2">
                {/* Replace default icons with Lucide icons */}
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  onClick={() => ZoomOut({})}
                  aria-label="Zoom out"
                  title="Zoom out"
                >
                  <ZoomOutIcon size={20} />
                </button>
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  onClick={() => ZoomIn({})}
                  aria-label="Zoom in"
                  title="Zoom in"
                >
                  <ZoomInIcon size={20} />
                </button>
                <div className="flex items-center">
                  <CurrentPageInput />
                  <span>/</span>
                  <NumberOfPages />
                </div>
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  onClick={() => Print({})}
                  aria-label="Print"
                  title="Print"
                >
                  <PrintIcon size={20} />
                </button>
              </div>
            );
          }}
        </Toolbar>
      </div>

      {/* PDF Viewer */}
      <div className="flex h-screen w-full items-center justify-center overflow-hidden p-4 bg-white">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
