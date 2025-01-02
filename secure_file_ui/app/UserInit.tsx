import FullScreenSpinner from "@/common-ui/FullScreenSpinner";
import ROUTES, { PUBLIC_ROUTES } from "@/constants/routes";
import { useAuthUserRouteGuard } from "@/hooks/route-guard";
import { useUserRepository } from "@/hooks/user.repository";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeUserContext } from "@/store/user-context/user-context.reducer";
import { selectUserIsInitialized } from "@/store/user-context/user-context.selectors";
import { CircularProgress } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Initialized user and waits for the initialization to complete
 * Renders children only if user is initialized
 */
export default function UserInit({children}: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const isInitialized = useAppSelector(selectUserIsInitialized);
    const {getLoggedInUser} = useUserRepository();
    const _ = useAuthUserRouteGuard();

    useEffect(() => {
        if(isInitialized) return;
        (async function() {
            try {
                const user = await getLoggedInUser();
                dispatch(initializeUserContext(user))
            } catch (error) {
                dispatch(initializeUserContext(null));
                if(PUBLIC_ROUTES.includes(pathname)) return;
                router.push(ROUTES.LOGIN);
            }
        })();
    }, [isInitialized, dispatch, getLoggedInUser, router, pathname]);

    if(isInitialized) return children;
    return <FullScreenSpinner />
}