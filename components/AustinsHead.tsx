'use client';

import { useEffect, useState } from 'react';

/** 
 * The number of milliseconds to wait between 
 * each frame of the animation.
 */
const MS_PER_FRAME = 1000 / 8;

/**
 * The paths to the images to use for the animation.
 */
const IMG_PATHS = new Array(18).fill(0)
    .map((_, i) => `${i}`.padStart(2, '0'))
    .map(n => `/images/austin-bntsg-${n}.png`);

    
export default function AustinsHead() {
    const [imgPathIdx, setImgPathIdx] = useState(0);
    useEffect(() => {
        // Define the timer...
        let timer = setInterval(() => {
            setImgPathIdx(idx => (idx + 1) % IMG_PATHS.length);
        }, MS_PER_FRAME);

        // Callback to clear the timer...
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="py-10 bg-emerald-400">
            <div className="relative">
                {IMG_PATHS.map((path, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                        key={i}
                        src={path} 
                        alt="A photo of Austin's head, rotating in a circle, like in the Bill Nye the Science Guy intro."
                        width={512}
                        height={394}
                        className={"mx-auto w-[450px] rounded-full" + (i === imgPathIdx ? "" : " hidden")}
                    />
                ))}
                <div className="block absolute text-center -bottom-5 w-full">
                    <h1 className="block text-center mx-auto text-6xl font-bold text-neutral-50 font-mono antialiased tracking-tighter">
                        {/* Hi, I&apos;m Austin! */}
                        Austin the Developer
                    </h1>
                </div>
            </div>
        </div>
    );
}
