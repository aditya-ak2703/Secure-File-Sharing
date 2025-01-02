import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { ISharableLink } from '@/models/file';
import ROUTES from '@/constants/routes';

export interface SharableLinkDisplayProps {
    sharableLink: ISharableLink;
    open: boolean;
    onClose: () => void;
}

const SharableLinkDisplay = ({ open, onClose, sharableLink }: SharableLinkDisplayProps) => {
    
    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>Public Link</DialogTitle>
            <DialogContent style={{width: '600px'}}>
                <div className='p-4'>
                    <TextField
                        fullWidth
                        slotProps={{
                            input: {
                              readOnly: true,
                            },
                          }}
                        label="File link"
                        value={`${location.origin}${ROUTES.FILE}/?uuid=${sharableLink.uuid}`}
                    >
                    </TextField>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}  color="primary" >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SharableLinkDisplay;