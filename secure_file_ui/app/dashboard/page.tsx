"use client"
import TopPanel from "./TopPanel";
import { Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import FileUploadDialog from "./FileUploadDialog";
import FullScreenSpinner from "@/common-ui/FullScreenSpinner";
import { useFileRepository } from "@/hooks/files.repository";
import FilesGrid from "./FilesGrid";

export default function DashboardPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);

    const fileRepository = useFileRepository();

    async function handleFileUploadDialogClose(file?: {fileName: string, content: string}) {
        if(!file) {
            setFileUploadDialogOpen(false);
            return
        }
        setIsLoading(true);

        try {
            const res = await fileRepository.createFile(file.fileName, file.content);
            console.log(res);
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    }

    return <main className="flex flex-col h-full overflow-hidden">
        {isLoading && <FullScreenSpinner />}
        <TopPanel />
        <div className="p-4 pl-20 flex-1 flex flex-col items-start overflow-hidden">
            <Button 
                startIcon = {<AddIcon />}
                variant="contained"
                onClick={() => setFileUploadDialogOpen(true)}
            > Add File </Button>
            {fileUploadDialogOpen && <FileUploadDialog open={fileUploadDialogOpen} onClose={handleFileUploadDialogClose}/>}
            <FilesGrid files={fileRepository.fileList} />
        </div>
    </main>
}