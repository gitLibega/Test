import { title } from "process";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcxMjcxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4YzQ5NDNmOWNmNTRlZjI5NmFmNTMyOWUwODM4YWQ5IiwidXNlcl9pZCI6NzkyfQ.5n8YHTjsgAnYnc4gioyV1wPnxM2D16PS6c9kNhC-JoE";

const apiUrl = "https://skypro-music-api.skyeng.tech/catalog/track/all/";
const apiUrPlaylist = "https://skypro-music-api.skyeng.tech/catalog/selection/";

export async function getTracks() {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}
//Функция для получения избранных треков
export async function fetchFavoritesTracks(access:string) {
  const response = await fetch(
    "https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/",
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return response.json;
}

export async function getPlaylistTracks(id: string) {
  const res = await fetch(apiUrPlaylist + id);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return { items: data.items, title: data.name };
}

// // Обратите внимание, что функция компонента также является асинхронной
// export default async function HomePage() {
//   const data = await getData();

//   return <main>/* Некий контент */</main>;
// }
