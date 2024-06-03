import { getPlaylistTracks } from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Playlist from "@/components/Playlist/Playlist";

type CategoryType = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryType) {
  const tracksData = await getPlaylistTracks(params.id);
  return (
    <>
      <CenterBlock tracks={tracksData} playlist={tracksData}/>
    </>
  );
}
