import React, { useState } from "react";
import LatestGame from "../components/useLatestGame.jsx"; // Ensure this is correct (see note below)
import AllGamesPage from "../components/AllGames.jsx"; // Changed to default import
export default function FeedPage() {
    const [activeTab, setActiveTab] = useState("my");
    const { latestGame, loading: latestGameLoading, error: latestGameError } = LatestGame();

    return (
        <div className="p-6 font-sans">
            {/* Tabs */}
            <div className="flex gap-6  pb-2 mb-6 ml-52">

                {["my", "featured", "global"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-lg ${activeTab === tab
                            ? "border-b-4 border-red-500 font-semibold text-black"
                            : "text-gray-600 hover:text-black"
                            }`}
                    >
                        {tab === "my"
                            ? "My feed"
                            : tab === "featured"
                                ? "Featured games feed"
                                : "Global feed"}
                    </button>
                ))}
                <button className="ml-[500px] border border-red-500 text-red-500 font-bold px-2 rounded text-sm">Manage my Games</button>
                <div className="flex flex-col">
                    <p className="ml-6 font-bold">0</p>
                    <p>Followers</p>
                </div>
                <div className="flex flex-col ">
                    <p className="ml-6 font-bold">0</p>
                    <p>Followers</p>
                </div>
            </div>


            {/* Layout */}
            <div className="flex gap-6 ml-8 mr-64 bg-gray-100">
                {/* Feed Section */}
                <div className="flex-1">
                    {activeTab === "my" && (
                        <>
                            <div className="p-4 mt-8 rounded text-center">
                                <h2 className="text-xl">Your personal timeline is currently empty.</h2>
                                <p>Follow Some People to get a personalized feed of games.</p>
                                <p> In the meantime here's some featured content.</p>
                            </div>
                            <div className="border rounded bg-white shadow-sm p-4">
                                <div className="flex justify-between items-center text-sm mb-4">
                                    <span>
                                        <strong>teamwood</strong> updated a game · 10 minutes ago
                                    </span>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                                        + Follow teamwood
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <img
                                        src="https://static.wikia.nocookie.net/super-auto-pets/images/8/89/Pig.png"
                                        alt="game"
                                        className="w-24 h-24 object-contain border rounded"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">
                                            Super Auto Pets (Public testing)
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            A browser game made in HTML5.
                                        </p>
                                        <a
                                            href="#"
                                            className="text-blue-600 underline text-sm block mb-2"
                                        >
                                            WebGL-178-Staging.zip - Play in browser
                                        </a>
                                        <button className="bg-gray-200 px-3 py-1 rounded border text-sm">
                                            View game
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "featured" && (
                        <div className="text-gray-600">
                            <p>Featured games feed content coming soon...</p>
                            <div className="border rounded bg-white shadow-sm p-4 mt-4">
                                <p className="text-sm">Loading featured games...</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "global" && (
                        <div className="p-0">
                            <AllGamesPage />
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-72">
                    <div className="bg-red-500 border text-white p-4 rounded mb-6 text-sm">
                        <p className="font-semibold">Add a profile image</p>
                        <p>
                            Your account doesn’t have a profile image, add one so it’s easier
                            for others to identify you at a glance!
                        </p>
                    </div>

                    <h4 className="font-semibold mb-3">Latest Featured Game</h4>
                    <LatestGame />
                </div>
            </div>
        </div>
    );
}