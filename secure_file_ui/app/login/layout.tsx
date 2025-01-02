"use client";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <div className="signup-page">
        <div className="m-auto pt-20" style={{width: '450px'}}>
            {children}
        </div>
    </div>
}