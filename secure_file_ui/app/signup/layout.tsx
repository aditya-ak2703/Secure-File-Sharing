"use client";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <div className="signup-page">
        <div className="w-1/2 m-auto pt-20">
            {children}
        </div>
    </div>
}