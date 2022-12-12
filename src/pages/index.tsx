import Head from "next/head";
import { FormEvent, useState } from "react";

type ShortLink = {
  id: number;
  created: Date;
  url: string;
  slug: string;
};

type Error = {
  message: string;
};

export default function Home() {
  const [error, setError] = useState<Error | null>();
  const [apiData, setApiData] = useState<ShortLink | null>(null);
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/shorten-url", {
      method: "POST",
      body: JSON.stringify({ url, slug }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setApiData(data);
      setError(null);
      setTimeout(() => setApiData(null), 10000);
    } else {
      setError(data);
      setApiData(null);
      console.error(data);
      setTimeout(() => setError(null), 10000);
    }
  };

  return (
    <>
      <Head>
        <title>Link Shortener | guilhermeutzig</title>
      </Head>
      <main className="bg-gray-800 h-screen w-screen flex justify-center items-center">
        <form
          className="flex flex-col w-[350px] items-center"
          onSubmit={onSubmit}
        >
          <input
            required
            className="w-full rounded border-[1px] border-gray-400 py-4 px-2 mb-4"
            placeholder="Paste your URL here"
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            required
            className="w-full rounded border-[1px] border-gray-400 py-4 px-2 mb-4"
            placeholder="Type your slug here"
            onChange={(e) => setSlug(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 px-4 rounded bg-blue-500 text-white w-fit"
          >
            Shorten link
          </button>
          {(apiData || error) && (
            <div className="bg-white p-4 rounded mt-4 text-gray-700">
              {error && (
                <>
                  <p>{error.message}</p>
                </>
              )}
              {apiData && (
                <>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap w-full mb-2">
                    URL:{" "}
                    <a
                      className="underline"
                      href={apiData.url}
                      target="__blank"
                    >
                      {apiData.url}
                    </a>
                  </p>
                  <p className="mb-2">Slug: {apiData.slug}</p>
                  <a
                    href={`https://utzigui-link-shortener.vercel.app/${apiData.slug}`}
                    className="block py-2 px-4 rounded bg-blue-500 text-white w-fit"
                    target="__blank"
                  >
                    Test it!
                  </a>
                </>
              )}
            </div>
          )}
        </form>
      </main>
    </>
  );
}
