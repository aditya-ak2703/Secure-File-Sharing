import { CircularProgress } from "@mui/material";

export default function FullScreenSpinner() {
    return <div className="w-screen h-screen flex justify-center items-center top-0 left-0 fixed">
        <CircularProgress />
    </div>
}