import { useSignIn } from "@clerk/clerk-react";

const SignInOAuthButtons = () => {
const { signIn, isLoaded } = useSignIn();

    if (!isLoaded) {
    return null;
    }

    const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
    strategy: "oauth_google",
    redirectUrl: "/sso-callback",
    redirectUrlComplete: "/auth-callback",
    });
    }
return (
<button 
    onClick={signInWithGoogle} 
    variant={"secondary"} 
    className='bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2'
>
    <img 
        src="/google.png" 
        alt="Google logo" 
        className="w-6 h-6 rounded-full"
    />
    Continue with Google
</button>
);
};

export default SignInOAuthButtons