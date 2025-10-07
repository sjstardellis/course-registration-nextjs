"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [data, setData] = useState<{ message?: string; time?: string }>({});

    useEffect(() => {
        fetch("/api/test")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    Next.js Test Page
                </h1>
                {data.message ? (
                    <>
                        <p className="text-green-600">{data.message}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Server time: {data.time}
                        </p>
                    </>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </main>
    );
}
