import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { Card, CardContent } from "../../components/ui/card"; 
import { Loader } from "lucide-react";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [hasSynced, setHasSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || hasSynced || isSyncing) return;
      
      setIsSyncing(true);
      try {
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          email: user.primaryEmailAddress?.emailAddress, 
          username: user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0], 
        });

        setHasSynced(true);
        navigate("/Dashboard");
      } catch (error) {
        console.error("Error in auth Callback", error);
      } finally {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [isLoaded, user, navigate, hasSynced, isSyncing]);


return(
  <div className='h-screen w-full bg-black flex items-center justify-center'>
  <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
  <CardContent className='flex flex-col items-center gap-4 pt-6'>
  <Loader className='size-6 text-emerald-500 animate-spin' />
  <h3 className='text-zinc-400 text-xl font-bold'>Logging you in</h3>
  <p className='text-zinc-400 text-sm'>Redirecting...</p>
  </CardContent>
  </Card>
</div>
)
};
export default AuthCallbackPage;