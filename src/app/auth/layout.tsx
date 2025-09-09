export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-full max-w-1/4 flex-col gap-4">
                {children}
            </div>
        </div>
    )
}
