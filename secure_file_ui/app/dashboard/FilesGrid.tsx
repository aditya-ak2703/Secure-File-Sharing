import { IFile } from "@/models/file";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Typography } from "@mui/material";


function FileDisplay({file}: {file: IFile}) {
    return <div className="flex flex-col items-center" style={{height: '160px', width: '140px', boxShadow: "0 0 1px grey", overflow: 'hidden'}}>
        <InsertDriveFileIcon style={{height: '110px', width: '110px'}}/>
        <Typography variant="body2" style={{maxWidth: '132px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {file.fileName} </Typography>
    </div>
}

export interface IFilesGridProps {
    files: IFile[];
}

export default function FilesGrid({files}: IFilesGridProps) {
    return <div className="flex flex-wrap gap-4 mt-6">
        {files.map((file, index) => <FileDisplay file={file} key={index} />)}
    </div>
}

