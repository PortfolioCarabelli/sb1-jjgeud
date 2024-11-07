import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: () => void;
}

function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    let progress = 0;
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onUploadComplete();
        }, 500);
      }
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Upload Excel File</h2>
        <p className="text-gray-600 mt-2">Upload your Excel file to analyze the data</p>
      </div>

      {!isUploading ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'
          } transition-all duration-200`}
        >
          <div className="flex flex-col items-center">
            <FileSpreadsheet className="h-12 w-12 text-indigo-500 mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your Excel file here, or{' '}
              <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">Supports .xlsx and .xls files</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
              <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
          {uploadProgress === 100 && (
            <div className="flex items-center justify-center text-green-500">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Upload complete!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;