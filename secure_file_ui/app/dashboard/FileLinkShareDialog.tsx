import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { FILE_PERMISION, IFile } from '@/models/file';

export interface FileLinkShareDialogProps {
    open: boolean;
    onClose: (sharable?: { permission: FILE_PERMISION, expiry: Date }) => void;
}

const EXPIRY_DURATION = {
    ONE_HOUR: 1000 * 60 * 60,
    FOUR_HOUR: 1000 * 60 * 60 * 4,
    EIGHT_HOUR: 1000 * 60 * 60 * 8,
    ONE_DAY: 1000 * 60 * 60 * 24,
    ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
    ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
}

const EXPIRY_OPTIONS = [
    { displayName: "1 Hour", value: EXPIRY_DURATION.ONE_HOUR },
    { displayName: "4 Hour", value: EXPIRY_DURATION.FOUR_HOUR },
    { displayName: "8 Hour", value: EXPIRY_DURATION.EIGHT_HOUR },
    { displayName: "1 Day", value: EXPIRY_DURATION.ONE_DAY },
    { displayName: "1 Week", value: EXPIRY_DURATION.ONE_WEEK },
    { displayName: "1 Month", value: EXPIRY_DURATION.ONE_MONTH },
]

const PERMISSION_OPTIONS = [
    { displayName: "View", value: FILE_PERMISION.VIEW },
    { displayName: "Download", value: FILE_PERMISION.DOWNLOAD },
]

const FileLinkShareDialog = ({ open, onClose }: FileLinkShareDialogProps) => {
    const [expiryDuration, setExpiryDuration] = useState<number>(EXPIRY_DURATION.FOUR_HOUR);
    const [filePermission, setFilePermission] = useState<FILE_PERMISION>(FILE_PERMISION.VIEW);

    function handleCreate() {
        onClose({ permission: filePermission, expiry: new Date(Date.now() + expiryDuration) })
    }

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>Create Sharable File Link</DialogTitle>
            <DialogContent>
                <div className='p-4'>
                    <TextField
                        fullWidth
                        select
                        label="File Permission"
                        value={filePermission}
                        onChange={(ev) => setFilePermission(ev.target.value as any)}
                        helperText="Please select your file permission"
                    >
                        {PERMISSION_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.displayName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <br /><br />
                    <TextField
                        fullWidth
                        select
                        label="Expiry Duration"
                        value={expiryDuration}
                        onChange={(ev) => setExpiryDuration(parseInt(ev.target.value))}
                        helperText="Select Time for expiry"
                    >
                        {EXPIRY_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.displayName}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary" >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileLinkShareDialog;