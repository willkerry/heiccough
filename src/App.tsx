import heic2any from "heic2any";
import { useState, useRef, useCallback } from "react";
import { checkFilesForNonHeic } from "./lib/checkFilesForNonHeic";
import { isUkOrIreland } from "./lib/isUkOrIreland";

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: string }>({});
  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const heicFiles = checkFilesForNonHeic(droppedFiles);

    if (heicFiles.length > 0) {
      setFiles((prev) => [...prev, ...heicFiles]);
      convertFiles(heicFiles);
    }
  }, []);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = checkFilesForNonHeic(Array.from(e.target.files || []));
    setFiles((prev) => [...prev, ...files]);
    convertFiles(files);
  };

  const convertFiles = async (filesToConvert: File[]) => {
    setConverting(true);

    for (const file of filesToConvert) {
      try {
        setProgress((prev) => ({ ...prev, [file.name]: "Converting\u2026" }));

        const jpegBlobOrBlobs = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        });

        const jpegBlob = Array.isArray(jpegBlobOrBlobs)
          ? jpegBlobOrBlobs[0]
          : jpegBlobOrBlobs;

        // Create a download link
        const url = URL.createObjectURL(jpegBlob);
        const link = document.createElement("a");
        const newFilename = file.name.replace(/\.heic$/i, ".jpg");
        link.href = url;
        link.download = newFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);

        setProgress((prev) => ({
          ...prev,
          [file.name]: "Downloaded",
        }));
      } catch (error) {
        console.error(`Error converting ${file.name}:`, error);
        setProgress((prev) => ({ ...prev, [file.name]: "Error converting" }));
      }
    }

    setConverting(false);
  };

  const appName = isUkOrIreland() ? "Heiccough" : "Heiccup";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-red-700">{appName}</h1>
          <p className="text-sm text-gray-500">
            Convert HEIC images to JPEGs. Drop files or tap to select.
          </p>
        </div>

        <div
          ref={dropRef}
          className={`border-2 border-gray-300 rounded-md p-8 text-center cursor-pointer border-dashed mb-6${
            isDragging ? " border-gray-500" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileInputClick}
        >
          <p className="text-sm font-medium">
            {converting ? "Converting\u2026" : "Drop HEIC images here"}
          </p>
          <p className="text-xs text-gray-500">
            Files will be converted to JPEG and downloaded automatically
          </p>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInputChange}
            multiple
          />
        </div>

        <div className="min-h-[200px]">
          {files.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-medium">Files</h2>
              <ul className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex gap-2 items-center"
                  >
                    <span className="text-sm font-mono truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-4 h-4 rounded-sm shadow"
                    />
                    <span className="text-xs text-gray-500">
                      {progress[file.name] || "Waiting..."}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
