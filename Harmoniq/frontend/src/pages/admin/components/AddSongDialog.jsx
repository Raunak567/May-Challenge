import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddSongDialog = () => {
  const { albums } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "0",
  });

  const [files, setFiles] = useState({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        toast.error("Please upload both audio and image files");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);
      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: "0",
      });

      setFiles({
        audio: null,
        image: null,
      });
      toast.success("Song added successfully");
    } catch (error) {
      toast.error("Failed to add song: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black border-zinc-800 text-white max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Song</DialogTitle>
          <DialogDescription className="text-zinc-400">Add a new song to your music library</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files[0] }))}
          />

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files[0] }))}
          />

          {/* image upload area */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">Image selected:</div>
                  <div className="text-xs text-zinc-400">{files.image.name.slice(0, 20)}</div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">Upload artwork</div>
                  <Button variant="outline" size="sm" className="text-xs bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Audio upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Audio File</label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => audioInputRef.current?.click()} 
                className="w-full bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
              >
                {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
              </Button>
            </div>
          </div>

          {/* other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Title</label>
            <Input
              value={newSong.title}
              onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Artist</label>
            <Input
              value={newSong.artist}
              onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Duration (seconds)</label>
            <Input
              type="number"
              min="0"
              value={newSong.duration}
              onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Album (Optional)</label>
            <Select
              value={newSong.album}
              onValueChange={(value) => setNewSong({ ...newSong, album: value })}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="none" className="text-white hover:bg-zinc-700">No Album (Single)</SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id} className="text-white hover:bg-zinc-700">
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setSongDialogOpen(false)} 
            disabled={isLoading}
            className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-black"
          >
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
