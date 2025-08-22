import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegComment } from "react-icons/fa";

// Temporary mock devlog for now
const MOCK_DEVLOG = {
  slug: "gravity-storm-is-almost-finished",
  title: "Gravity Storm is Almost Finished",
  subtitle: "Gravity Storm - First Mission (Demo 3) • Devlog",
  coverImages: [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
  ],
  author: {
    name: "Jampley Dev",
    username: "@JampleyDev",
  },
  date: "15 hours ago",
  tags: ["16-bit 2D", "Gravity", "Pixel Art", "Retro", "Sci-fi"],
  status: "In development",
  genre: ["Platformer", "Action", "Puzzle", "Shooter"],
  languages: ["English", "Spanish", "Portuguese (Brazil)"],
  accessibility: ["Configurable controls", "Interactive tutorial"],
  description: `Hi, I disappeared for a few weeks to actually finish my game. 
  Gravity Storm - First Mission is almost done. I had to make some compromises, 
  but the game only needs some playtesting, tweaking and a final boss theme.
  
  I’ll put out a release date trailer soon, then I’ll give the game to a few people 
  to playtest. Gravity Storm will be available on Steam and Itch.io.`,
  links: [
    { label: "Steam", url: "#" },
    { label: "Discord", url: "#" },
    { label: "Ko-Fi", url: "#" },
  ],
  download: {
    label: "Get Gravity Storm - First Mission (Demo 3)",
    button: "Download Now",
    price: "Name your own price",
  },
  comments: [
    { user: "Jony Player", time: "2 hours ago", text: "Finally!" },
    {
      user: "IndieStory",
      time: "2 hours ago",
      text: `Hey Jampley, I just played Gravity really creative concept! 
      It's always great seeing original ideas like this come to life.`,
    },
  ],
};

const DevLogDetail = () => {
  const { slug } = useParams();
  const [devlog, setDevlog] = useState(null);

  console.log("Prams Slug ",slug)
  console.log("Mock Slug ",MOCK_DEVLOG.slug)

  // In future: fetch from API using slug
  useEffect(() => {
    // For now: simulate fetching data
    if (slug === MOCK_DEVLOG.slug) {
      setDevlog(MOCK_DEVLOG);
    }
  }, [slug]);

  if (!devlog) {
    return <div className="p-6 text-center text-zinc-400">Loading...</div>;
  }

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:flex lg:gap-8">
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">{devlog.title}</h1>
          <p className="text-sm text-green-400 mb-4">{devlog.subtitle}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-zinc-400 mb-6">
            <button className="flex items-center gap-1 hover:text-red-400">
              <FaHeart /> Like
            </button>
            <span>{devlog.date}</span>
            <span>by {devlog.author.name} ({devlog.author.username})</span>
          </div>

          {/* Cover Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {devlog.coverImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={devlog.title}
                className="rounded-lg object-cover w-full h-auto"
              />
            ))}
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none mb-6 whitespace-pre-line">
            {devlog.description}
          </div>

          {/* Links */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Links:</h3>
            <ul className="list-disc list-inside space-y-1">
              {devlog.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="text-green-400 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Section */}
          <div className="bg-zinc-800 p-4 rounded-lg mb-8">
            <h3 className="font-bold mb-2">{devlog.download.label}</h3>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              {devlog.download.button}
            </button>
            <p className="text-sm text-zinc-400 mt-2">{devlog.download.price}</p>
          </div>

          {/* Comments */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Comments</h3>
            {devlog.comments.map((c, idx) => (
              <div key={idx} className="border-b border-zinc-800 pb-3 mb-3">
                <p className="text-sm text-green-400">{c.user} • {c.time}</p>
                <p className="text-zinc-300">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8 mt-8 lg:mt-0">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="font-bold mb-2">{devlog.subtitle}</h4>
            <p className="text-sm text-zinc-400 mb-4">
              2D action platformer with shooting, dashing and gravity mechanics.
            </p>
            <button className="bg-orange-500 w-full py-2 rounded hover:bg-orange-600 mb-4">
              Add Game to Collection
            </button>
            <ul className="text-sm text-zinc-300 space-y-3">
              <li><strong>Status:</strong> {devlog.status}</li>
              <li><strong>Author:</strong> {devlog.author.name}</li>
              <li><strong>Genre:</strong> {devlog.genre.join(", ")}</li>
              <li><strong>Tags:</strong> {devlog.tags.join(", ")}</li>
              <li><strong>Languages:</strong> {devlog.languages.join(", ")}</li>
              <li><strong>Accessibility:</strong> {devlog.accessibility.join(", ")}</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default DevLogDetail;
