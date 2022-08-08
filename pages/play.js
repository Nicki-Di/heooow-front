import styles from "../styles/Home.module.css";
import {useState} from "react";
import SubmitNameModal from "../components/SubmitNameModal";
import {useRouter} from "next/router";

export default function Play() {
    const router = useRouter()
    const [playing, setPlaying] = useState(false);
    const [open, setOpen] = useState(false);
    const [win, setWin] = useState(false);
    let audio

    if (typeof window !== 'undefined') {
        audio = new Audio("/sound2.5.mp3");
        audio.loop = true;
        document.body.onkeyup = function (e) {
            if (e.key === " " ||
                e.code === "Space") {
                playGame()
            }
        }
    }
    const playGame = () => {
        if (!playing) {
            audio.loop = true
            const character = document.getElementById("character").getBoundingClientRect().bottom;
            const ground = document.getElementById("ground").getBoundingClientRect().y;
            audio.play();
            setPlaying(true);

            console.log(ground - character);

            if (ground - character < 45) {
                setWin(true)
            }
            setTimeout(async () => {
                setPlaying(false)
                audio.loop = false

                if (!localStorage.getItem("name")) {
                    setOpen(true)
                } else {
                    await router.push({
                        pathname: '/result',
                        query: {win: ground - character < 45}
                    }, '/result');
                }

            }, 8000)
        }
    }


    return (
        <div
            className = {styles.pattern + " h-screen overflow-hidden bg-g-500 flex flex-col justify-between items-center"}>


            <img src = {"/background/main.png"} alt = {"logo"} className = {"max-w-lg sm:max-w-2xl -mt-24 "}/>
            <div className = {"flex flex-col justify-center items-center w-full pb-10 "}>
                {
                    open ?

                        <img src = {"/character/sleeping.png"}
                             className = {"max-w-[12rem] -mb-1 z-10"}
                             alt = {""}/>
                        :
                        <img src = {"/character/moving.png"}
                             id = {"character"}
                             className = {"max-w-[12rem] z-10 animate-MoveUpDown"}
                             alt = {"character"}
                        />
                }


                <div className = {"bg-g-100 h-1 rounded w-full lg:w-1/2 mb-6 "} id = {"ground"}/>
                <img src = {"/tip.png"} className = {"max-w-[12rem] mb-4"} alt = {""}/>

                <button
                    className = {styles.pattern + " bg-p-100 flex flex-row items-center rounded-2xl px-16 py-2 gap-1 text-g-100 p-big " + (playing ? "cursor-not-allowed" : " cursor-pointer")}
                    onClick = {playGame}
                    disabled = {playing}
                >
                    <p>Start</p>
                    <img src = {"/icons/PartyingFace.png"} alt = {"party face icon"} className = {"w-6 h-6 "}/>
                </button>

            </div>
            <SubmitNameModal isOpen = {open} setIsOpen = {setOpen} win = {win}/>
        </div>
    )
}