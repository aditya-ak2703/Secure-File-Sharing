"use client"
import TopPanel from "../../common-ui/TopPanel";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import FileUploadDialog from "./FileUploadDialog";
import FullScreenSpinner from "@/common-ui/FullScreenSpinner";
import { useFileRepository } from "@/hooks/files.repository";
import FilesGrid from "./FilesGrid";
import { FILE_PERMISION, IFile, ISharableLink } from "@/models/file";
import FileLinkShareDialog from "./FileLinkShareDialog";
import SharableLinkDisplay from "./SharableLinkDisplay";

export default function DashboardPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
    const [toShareFile, setToShareFile] = useState<IFile | null>(null);
    const [createsSharableLink, setCreatedSharableLink] = useState<ISharableLink | null>(null);

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
        setFileUploadDialogOpen(false);
    }

    function openFileShareDialog(file: IFile) {
        setToShareFile(file);
    }

    async function handleFileShareDialogClose(shareDetails?: {permission: FILE_PERMISION, expiry: Date}) {
        if(!shareDetails || !toShareFile) {
            setToShareFile(null);
            return;
        }
        setIsLoading(true);

        try {
            const res: ISharableLink = await fileRepository.createSharableLink(toShareFile, shareDetails.permission, shareDetails.expiry);
            setCreatedSharableLink(res);
        }
        catch (e) {
            console.log(e);
            setIsLoading(false);
            return;
        }


        setIsLoading(false);
        setToShareFile(null);
    }

    return <main className="flex flex-col h-full overflow-hidden">
        {isLoading && <FullScreenSpinner />}
        {fileUploadDialogOpen && <FileUploadDialog open={fileUploadDialogOpen} onClose={handleFileUploadDialogClose}/>}
        {toShareFile && <FileLinkShareDialog open={true} onClose={handleFileShareDialogClose} />}
        {createsSharableLink && <SharableLinkDisplay sharableLink={createsSharableLink} open={true} onClose={()=>setCreatedSharableLink(null)} />}
        <TopPanel />
        <div className="p-4 pl-20 flex-1 flex flex-col items-start overflow-hidden">
            <Button 
                startIcon = {<AddIcon />}
                variant="contained"
                onClick={() => setFileUploadDialogOpen(true)}
            > Add File </Button>
            <FilesGrid files={fileRepository.fileList} shareFile={openFileShareDialog} />
        </div>
    </main>
}