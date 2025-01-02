"use client"

import { useEffect, useState } from "react";
import TopPanel from "../../common-ui/TopPanel"
import FullScreenSpinner from "@/common-ui/FullScreenSpinner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { useFileRepository } from "@/hooks/files.repository";
import { FILE_PERMISION, IFile, ISharableLink } from "@/models/file";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { decrypt } from "@/common";


function FileDisaply({file, detials}: {file: IFile, detials: ISharableLink}) {

    async function downloadFile() {
        const parsed = JSON.parse(file.content);
        const base64 = await decrypt(parsed.cipher, parsed.iv);
        const el = document.createElement("a");
        el.href = "data:image/png;base64," + base64;
        el.download = file.fileName;
        el.click();
    }

    return <div style={{height: '500px', width: '800px'}} className="flex flex-col items-center">
        <InsertDriveFileIcon style={{height: '200px', width: '200px'}} />
        <Typography>{file.fileName}</Typography>
        {detials.permission == FILE_PERMISION.DOWNLOAD && <Button onClick={downloadFile}>
            <DownloadIcon style={{height: '32px', width: '32px'}} />
        </Button>}
    </div>
}

export default function FilePage() {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [file, setFile] = useState<IFile | null>(null);
    const [sharedDetials, setSharedDetials] = useState<ISharableLink | null>(null)

    const searchParams = useSearchParams();
    const router = useRouter();
    const { getSharedFile } = useFileRepository();

    useEffect(() => {
        const uuid = searchParams.get('uuid');
        if(!uuid) {
            router.push(ROUTES.HOMEPAGE);
            return;
        }
        (async function() {
            try {
                const res = await getSharedFile(uuid);
                setFile(res.file as IFile);
                setSharedDetials(res.sharable_link);
                setIsLoading(false);
            } catch(e) {
                alert("The uuid is not longer valid!");
                router.push(ROUTES.HOMEPAGE);
            }
        })()
    }, [searchParams, router, getSharedFile, setFile, setSharedDetials, setIsLoading])

    return <main className="flex flex-col h-full overflow-hidden">
        {isLoading && <FullScreenSpinner />}
        <TopPanel />
        <div className="flex-grow flex items-center justify-center">
            {file && sharedDetials && <FileDisaply file={file} detials={sharedDetials} />}
        </div>
    </main>
}


