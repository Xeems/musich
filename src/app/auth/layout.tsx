export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-slate-100/50 backdrop-blur-lg" />

            <div className="relative w-full max-w-md">{children}</div>
        </div>
    )
}
