'use client';
import Heading from "@/components/landingPage/heading";
import Heroes from "@/components/landingPage/heroes";
import {ArrowRight} from "lucide-react";
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const navigateToNotes = () => {
        router.push('/notes');
    }

    return (
        <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
            <div
                className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
                <Heading/>
                <Button onClick={navigateToNotes}>
                    Get Started
                    <ArrowRight className="ml-2"/>
                </Button>
                <Heroes/>
            </div>
        </div>
    );
}
