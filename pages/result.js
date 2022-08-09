import Lottie from 'react-lottie';
import animationData from '../public/lottie/paper-splash.json';
import styles from "../styles/Home.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import LeaderBoard from "../components/LeaderBoard";

export default function Result() {
    const router = useRouter()
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const [copied, setCopied] = useState(false)

    return (
        <div
            className = {styles.pattern + " min-h-screen overflow-hidden bg-g-500 flex flex-col justify-between items-center"}>

            <img src = {"/background/main.png"} alt = {"logo"} className = {"max-w-lg sm:max-w-2xl -mt-24 "}/>

            <LeaderBoard/>

            <div className = {"flex flex-col justify-center items-center w-full pb-10 -mt-10 short:mt-0"}>
                {
                    router.query.win === "true" ?
                        <div
                            className = {"flex flex-col-reverse sm:flex-row items-center justify-center gap-2 sm:gap-8 "}>
                            <div className = {"absolute cursor-default"}>
                                <Lottie
                                    isClickToPauseDisabled
                                    options = {defaultOptions}
                                    height = {"100vh"}
                                    width = {"100vw"}
                                />
                            </div>
                            <img src = {"/character/yes.png"}
                                 className = {"max-w-[5rem] sm:max-w-[12rem] -mb-1 "}
                                 alt = {""}/>
                            <div className = {"flex flex-col h6"}>
                                <div
                                    className = {"flex flex-row items-center justify-center sm:justify-start gap-2"}>
                                    <p className = {"text-success "}>Awesome!</p>
                                    <img src = {"/icons/PartyingFace.png"} alt = {"party face icon"}
                                         className = {"w-6 h-6 "}/>
                                </div>
                                <p className = {"text-g-100"}>You nailed it buddy</p>
                            </div>
                        </div>

                        :
                        <div
                            className = {"flex flex-col-reverse sm:flex-row items-center justify-center gap-2 sm:gap-8 "}>
                            <img src = {"/character/no.png"}
                                 className = {"max-w-[6rem] sm:max-w-[12rem] -mb-1 "}
                                 alt = {""}/>
                            <div className = {"flex flex-col h6"}>
                                <p className = {"text-failure text-center sm:text-left"}>Really?</p>
                                <div className = {"flex flex-row items-center gap-2"}>
                                    <p className = {"text-g-100 "}>It was Too easy</p>
                                    <img src = {"/icons/ConfusedFace.png"} alt = {"confused face icon"}
                                         className = {"w-6 h-6 "}/>
                                </div>
                            </div>
                        </div>
                }


                <div className = {"bg-g-100 h-1 rounded w-full lg:w-1/2 mb-6 "} id = {"ground"}/>
                <button
                    className = {"w-11/12 sm:w-auto my-6 border-2 border-p-100 rounded-2xl px-12 py-2 gap-1 text-g-100 p-big z-10 glow-on-hover"}
                    onClick = {async () => {
                        setCopied(true)
                        await navigator.clipboard.writeText(window.location.origin)
                    }}

                >
                    <p>{copied ? "Link Copied!" : "Share with friends"}</p>
                </button>


                <a href = {"/play"}
                   className = {styles.pattern + " w-11/12 sm:w-auto bg-p-100 rounded-2xl px-12 py-2 gap-1 text-g-100 p-big z-10 text-center "}>
                    Try again
                </a>

            </div>


        </div>
    )
}