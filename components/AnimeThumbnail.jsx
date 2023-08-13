import Image from "next/image";
import thumbnail from "/public/mqdefault.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AnimeThumbnail() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    const getAnimeList = async () => {
      const res = await fetch(
        "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCxxnxya_32jcKj4yN1_kD7A&maxResults=8&key=AIzaSyC9ysqSZxeaTA0kJJFiW3bC7GsqcatAepc",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("failed to fetch data");
      }

      const data = await res.json();

      setAnime(data["items"]);
    };
    getAnimeList();
  }, []);

  return (
    <section className="mx-8">
      <div className="my-5 ml-12">
        <h1 className="font-semibold text-2xl">For You</h1>
        <p className="text-slate-500">Top picks anime for you.</p>
      </div>

      <div className="flex flex-wrap">
        {anime.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/anime/${item.id}`}
              className="w-60 ml-12 mb-5 h-fit"
            >
              <Image
                className="rounded-lg shadow-2xl"
                src={
                  item.snippet.thumbnails.medium.url ==
                  "https://i.ytimg.com/img/no_thumbnail.jpg"
                    ? thumbnail
                    : item.snippet.thumbnails.medium.url
                }
                width={240}
                height={100}
                alt="thumbnail"
              />
              <p className="font-semibold">{item.snippet.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
