import { useCallback, useEffect, useState } from "react";
import * as apiEndpoints from "@/constants/api-endpoints";
import { IFile } from "@/models/file";


export function useFileRepository() {

    const [fileList, updateFileList] = useState<IFile[]>([]);

    const getAllFiles = useCallback(async function getAllFiles() {
        const response = await fetch(apiEndpoints.getFileListEndpoint(), {
            headers: {
                'Content-Type': 'application/json'
            },
            });
    
        if (!response.ok) {
            throw new Error('Failed to signup');
        }
        return response.json();
    }, [])

    useEffect(function (){
        (async function(){
            const res = await getAllFiles();
            updateFileList(res);
        })()
    }, [updateFileList])

    const createFile = useCallback(async function createFile(fileName: string, content: string) {
        const response = await fetch(apiEndpoints.getFileCreateEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({fileName, content})
            });
    
        if (!response.ok) {
            throw new Error('Failed to signup');
        }
        const jsonRes = await response.json();
        updateFileList([...fileList, jsonRes]);
        return jsonRes;
    }, [fileList, updateFileList])


    return {createFile, fileList};
}