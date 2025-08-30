import SignUpForm from './SignUpForm'

export default function SignUpPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex max-w-1/4 flex-col gap-4">
                <h1 className="text-center text-2xl font-bold">
                    Join the Musich app to listen to your favorite tracks and
                    artists
                </h1>
                <SignUpForm />
            </div>
        </div>
    )
}
