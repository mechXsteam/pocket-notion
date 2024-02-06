"use client";

export const Heading = () => {

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                A small scale notion clone for managing notes.
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Welcome to <span className="underline">Pocket Notion</span>
            </h3>
        </div>
    )
}

export default Heading;