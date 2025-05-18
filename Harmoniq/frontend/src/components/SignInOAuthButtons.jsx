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
<button onClick={signInWithGoogle} variant={"secondary"} className='bg-gradient-to-r from-[#6e00ff] to-[#ff00cc] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition'>
Continue with Google
</button>
);
};

export default SignInOAuthButtons