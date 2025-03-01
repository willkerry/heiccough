import { toast } from "sonner";

export const checkFilesForNonHeic = (files: File[]) => {
  const heicFiles = files.filter(
    (file) =>
      file.name.toLowerCase().endsWith(".heic") && file.type === "image/heic"
  );

  if (heicFiles.length === 0 && files.length === 1) {
    toast.error("The file you dropped is not an HEIC file.");
    return [];
  }

  if (heicFiles.length === 0 && files.length > 1) {
    toast.error("None of the files you dropped are HEIC files.");
    return [];
  }

  if (heicFiles.length !== files.length) {
    toast.error(
      `One or more of the files you dropped are not HEIC files. We'll ignore those.`
    );
  }

  return heicFiles;
};
