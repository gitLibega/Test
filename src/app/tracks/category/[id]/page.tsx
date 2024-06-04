import { getPlaylistTracks } from "@/api/tracks";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Playlist from "@/components/Playlist/Playlist";
import { useAppSelector } from "@/hooks";


type CategoryType = {
  params: { id: string };
};


export default async function CategoryPage({ params }: CategoryType) {
  const tracksData = await getPlaylistTracks(params.id);
  // const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)
  // // useEffect(() => {
  //   getTracks().then((tracksData) => {
  //     setTracks(tracksData);
  //     dispatch(setInitialTracks({ initialTracks: tracksData }));
  //   });
  // }, [dispatch]);
  return (
    <>
      <CenterBlock tracks={tracksData} playlist={tracksData}/>
    </>
  );
}
