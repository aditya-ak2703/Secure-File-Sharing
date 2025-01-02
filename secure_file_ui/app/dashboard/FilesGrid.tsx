import { IFile } from "@/models/file";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button, Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';


type IShareFile = (file: IFile) => void;

function FileDisplay({file, shareFile}: {file: IFile, shareFile: IShareFile}) {
    return <div className="flex flex-col items-center relative" style={{height: '160px', width: '140px', boxShadow: "0 0 1px grey", overflow: 'hidden'}}>
        <InsertDriveFileIcon style={{height: '110px', width: '110px'}}/>
        <Typography variant="body2" style={{maxWidth: '132px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {file.fileName} </Typography>
        <Button className="bottom-1 right-1" style={{position: 'absolute', height: '20px', width: '20px', minWidth: '20px', overflow:'hidden'}}
            onClick={() => shareFile(file)}
        >
            <ShareIcon style={{height: '18px', width: '18px'}}/>
        </Button>
    </div>
}

export interface IFilesGridProps {
    files: IFile[];
    shareFile: IShareFile;
}

export default function FilesGrid({files, shareFile}: IFilesGridProps) {

    return <div className="flex flex-wrap gap-4 p-1 pt-6 flex-1 overflow-y-auto">
        {files.map((file, index) => <FileDisplay file={file} shareFile={shareFile} key={index} />)}
    </div>
}

