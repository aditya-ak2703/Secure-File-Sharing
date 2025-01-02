import { useCallback, useEffect, useState } from "react";
import * as apiEndpoints from "@/constants/api-endpoints";
import { FILE_PERMISION, IFile } from "@/models/file";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user-context/user-context.selectors";


export function useFileRepository() {

    const [fileList, updateFileList] = useState<IFile[]>([]);
    const user = useAppSelector(selectUser)

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
            if(!user) return;
            const res = await getAllFiles();
            updateFileList(res);
        })()
    }, [updateFileList, user])

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

    const createSharableLink = useCallback(async function createSharableLink(file:IFile, permission: FILE_PERMISION, expiry: Date) {
        const response = await fetch(apiEndpoints.getSharableFileCreateEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    parentFile: file.id,
                    permission,
                    expiry: expiry.toISOString()
                })
            });
    
        if (!response.ok) {
            throw new Error('Failed to signup');
        }

        return response.json();
    }, [])

    const getSharedFile = useCallback(async function getSharableLink(uuid: string) {
        const response = await fetch(apiEndpoints.getViewSharedFileEndpoint(uuid), {
            headers: {
                'Content-Type': 'application/json'
            }
            });
    
        if (!response.ok) {
            throw new Error('Failed to signup');
        }

        return response.json();
    }, [])


    return {createFile, fileList, createSharableLink, getSharedFile};
}