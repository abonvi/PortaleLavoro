import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface DocumentUploadProps {
  label: string;
  accept?: string;
  required?: boolean;
  onChange: (file: File | null) => void;
}

export function DocumentUpload({ label, accept = '.pdf,.doc,.docx', required = true, onChange }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onChange(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    const fileType = file?.type.toLowerCase();
    const isAccepted = accept.split(',').some(type => {
      // Remove the dot from the extension
      const ext = type.trim().substring(1);
      return fileType.includes(ext) || file.name.toLowerCase().endsWith(ext);
    });

    if (file && isAccepted) {
      setSelectedFile(file);
      onChange(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      
      {!selectedFile ? (
        <div
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
            dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          } border-dashed rounded-xl hover:border-primary-500 transition-all duration-300 cursor-pointer`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-primary-500" />
            <div className="flex text-sm text-gray-600">
              <span className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                Carica un file
                <input
                  ref={inputRef}
                  id={label.replace(/\s+/g, '-').toLowerCase()}
                  type="file"
                  accept={accept}
                  required={required && !selectedFile}
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </span>
              <p className="pl-1">o trascina qui</p>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC fino a 10MB</p>
          </div>
        </div>
      ) : (
        <div className="mt-1 flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-primary-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}