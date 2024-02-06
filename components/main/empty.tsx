import Image from "next/image";

export const EmptyHero = () => {
    return (
        <div className="flex items-center justify-center max-w-5xl mx-20 ">
            <div className="flex items-center">
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Image
                        src="working-vacation.svg"
                        fill
                        alt="Engineer Image"
                    />
                </div>
            </div>
            <div className="flex items-center">
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Image
                        src="remote-work.svg"
                        fill
                        alt="Create a note"
                    />
                </div>
            </div>
        </div>
    )
}

export default EmptyHero;