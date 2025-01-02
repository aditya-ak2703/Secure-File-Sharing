import { CircularProgress } from "@mui/material";

export default function FullScreenSpinner() {
    return <div className="flex justify-center items-center top-0 left-0" style={{height: '100vh', width: '100vw', position: 'fixed', backdropFilter: 'blur(2px)'}}>
        <CircularProgress />
    </div>
}