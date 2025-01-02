import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

export interface FileUploadDialogProps {
    open: boolean;
    onClose: (file?: {fileName: string, content: string}) => void;
  }

const FileUploadDialog = ({ open, onClose }: FileUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(!file) return;
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = (reader.result as any)?.split(',')[1];
        setBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if(file) onClose({fileName: file.name, content: base64});
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent>
        <input type="file" onChange={handleFileChange} />
        <br/>
        <br/>
        {base64 && "Click on upload to continue..."}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpload} color="primary" disabled={!base64}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;