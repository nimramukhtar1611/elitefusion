import React, { useState } from "react";

export default function CreatorDashboard() {
    const [activeTab, setActiveTab] = useState("projects");

    return (
        <div className="p-6 font-sans bg-gray-100 flex justify-center">
            {/* Centered Container */}
            <div className="w-full max-w-5xl shadow border-2 border-grey-100">
                <div>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded shadow">
                        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Creator Dashboard</h1>
                        <div className="flex space-x-6 text-gray-600">
                            <div className="flex flex-col text-center">
                                <p className="font-bold">0</p>
                                <p>Views</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="font-bold">0</p>
                                <p>Downloads</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <p className="font-bold">0</p>
                                <p>Followers</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-gray-100 p-4 rounded  mt-[-25px]">
                        <div className="flex flex-wrap gap-4 border-b">
                            {["projects", "analytics", "earnings", "promotions", "posts", "gamejams", "more"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-2 text-lg ${activeTab === tab
                                            ? "border-b-2 border-red-500 font-semibold text-black"
                                            : "text-gray-600 hover:text-black"
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() +
                                        tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
                                </button>
                            ))}
                        </div>
                        {activeTab === "projects" && (
                            <div className="text-red-600 bg-red-100 p-4 rounded ml-[-17px] mr-[-17px]">
                                <p>
                                    <span className="font-semibold">itch.io tips</span> 🔔{" "}
                                    <span className="font-semibold">Bluesky integration</span>: You can use your itch.io URL as your Bluesky username.{" "}
                                    <a href="#" className="underline">learn more →</a>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="bg-white p-6 rounded text-center mt-[-15px]">
                        <h2 className="text-2xl font-semibold mb-4 mt-8">
                            Are you a developer? Upload your first game
                        </h2>
                        <div className="flex justify-center mt-8">
                            <button className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition">
                                Create new project
                            </button>
                        </div>
                        <div className="flex justify-center mt-8 mb-8">
                            <a className="underline cursor-pointer">Nah, take me to the games feed</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
