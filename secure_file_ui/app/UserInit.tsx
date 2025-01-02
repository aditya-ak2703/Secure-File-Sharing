import FullScreenSpinner from "@/common-ui/FullScreenSpinner";
import { useUserRepository } from "@/hooks/user.repository";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeUserContext } from "@/store/user-context/user-context.reducer";
import { selectUserIsInitialized } from "@/store/user-context/user-context.selectors";
import { useEffect } from "react";

/**
 * Initialized user and waits for the initialization to complete
 * Renders children only if user is initialized
 */
export default function UserInit({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(selectUserIsInitialized);
    const {getLoggedInUser} = useUserRepository();

    useEffect(() => {
        if(isInitialized) return;
        (async function() {
            try {
                const user = await getLoggedInUser();
                dispatch(initializeUserContext(user))
            } catch (error) {
                dispatch(initializeUserContext(null));
            }
        })();
    }, [isInitialized, dispatch, getLoggedInUser]);

    if(isInitialized) return children;
    return <FullScreenSpinner />
}