import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-4 mb-8'>
				<Button variant="ghost" size="icon" className="mr-2" asChild>
					<Link to="/">
						<ArrowLeft className="h-5 w-5" />
					</Link>
				</Button>
				<i className="fas fa-music text-3xl text-purple-500 animate-pulse"></i>
				<div>
					<h1 className='text-2xl font-bold'>Music Manager</h1>
					<p className='text-zinc-400 mt-1'>Manage your music catalog</p>
				</div>
			</div>
			<UserButton />
		</div>
	);
};
export default Header;