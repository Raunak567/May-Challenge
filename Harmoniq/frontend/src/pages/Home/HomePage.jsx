import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "../../components/skeletons/PlaylistSkeleton";

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchAlbums,
		fetchTrendingSongs,
		isLoading,
		albums,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchAlbums();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchAlbums, fetchTrendingSongs]);

	useEffect(() => {
		if (albums.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...albums, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, albums, trendingSongs, featuredSongs]);

	return (
		<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<Topbar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1>
					<FeaturedSection />

					<div className='space-y-8'>
						<div className="space-y-4">
							<h2 className="text-xl font-semibold">Made For You</h2>
							{isLoading ? (
								<PlaylistSkeleton />
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{albums.map((album) => (
										<Link
											to={`/albums/${album._id}`}
											key={album._id}
											className='p-4 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer transition-colors'
										>
											<img
												src={album.imageUrl}
												alt={album.title}
												className='size-16 rounded-md flex-shrink-0 object-cover'
											/>
											<div className='flex-1 min-w-0'>
												<p className='font-medium truncate'>{album.title}</p>
												<p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
											</div>
										</Link>
									))}
								</div>
							)}
						</div>
						<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};
export default HomePage;