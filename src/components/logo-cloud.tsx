import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import img1 from "@/app/components/images/bizsparks.jpg"
import img2 from "@/app/components/images/nps.jpg"
import Image from 'next/image'

export default function LogoCloud() {
    return (
        <section className="bg-background  overflow-hidden py-16">
            <div className="group relative mx-auto w-full max-w-7xl  px-2">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="relative py-6 md:w-[calc(100%-1rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img1}
                                    alt="Nvidia Logo"
                                />
                            </div>

                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img2}
                                    alt="Column Logo"
                                    height="16"
                                    width="20"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img1}
                                    alt="GitHub Logo"
                                    height="40"
                                    width="40"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img2}
                                    alt="Nike Logo"
                                    height="20"
                                    width="30"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img1}
                                    alt="Lemon Squeezy Logo"
                                    height="20"
                                    width="20"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img1}
                                    alt="Laravel Logo"
                                    height="16"
                                    width="20"
                                />
                            </div>
                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img2}
                                    alt="Lilly Logo"
                                    height="28"
                                    width="20"
                                />
                            </div>

                            <div className="flex">
                                <Image
                                    className="mx-auto h-20 w-fit dark:invert"
                                    src={img1}
                                    alt="OpenAI Logo"
                                    height="24"
                                    width="20"
                                />
                            </div>
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
