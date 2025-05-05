
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import clsx from "clsx";
import axios from 'axios';
import { blogPost } from '../utils/constants';

const BlogPage = () => {
    const [showAIContent, setShowAIContent] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        let isMounted = true;
        async function getSummary() {
            try {
                const response = await axios.post("https://summary-ucrz.onrender.com/summarize", { text: blogPost.content });
                if (isMounted) {
                    console.log(response.data)
                    setSummary(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch summary:", error);
            }
        }
        getSummary();
        return () => {
            isMounted = false;
        };
    }, [showAIContent]);


    useEffect(() => {
        if (isScanning) {
            // Lock scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Unlock scroll
            document.body.style.overflow = '';
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [isScanning]);
    const handleAISummaryClick = () => {

        setIsScanning(true);
        setTimeout(() => {
            setShowAIContent(true);
            setIsScanning(false);
        }, 3000); // Simulate scanning animation duration
    };

    const handleBackClick = () => {
        setShowAIContent(false);
    };

    return (
        <div className="h-screen bg-white">
            <Navbar />
            <Header onAIButtonClick={handleAISummaryClick} showAIButton={showAIContent} onBackClick={handleBackClick} />
            <FeatureBar />
            {isScanning && <ScanningAnimation />}
            {!showAIContent ? <Content /> : <AIContent summary={summary} />}
        </div>
    );
};

export default BlogPage;

function Header({ onAIButtonClick, showAIButton, onBackClick }: { onAIButtonClick: () => void, showAIButton: boolean, onBackClick: () => void }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFollowClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsFollowing(prev => !prev);
            setIsAnimating(false);
        }, 300); // Duration of animation
    };

    return (
        <div className='max-w-[680px] mx-auto'>
            <div>
                <h1 style={{ letterSpacing: '-0.011em' }}
                    className='leading-[52px] mt-[1.19em] text-[42px] font-bold text-[#242424] mb-[32px]'>
                {blogPost.heading}
                </h1>
            </div>
            <div className='flex justify-between pr-10'>
                <div className='flex gap-[12px] items-center'>
                    <img alt="Maxim Gorin" className='rounded-full ' src={blogPost.url} width="32" height="32" loading="lazy" />
                    <div className='flex gap-[12px] items-center'>
                        <span className='text-[#242424] text-[14px]'>{blogPost.name}</span>
                        <div className='cursor-pointer'>
                            <button
                                onClick={handleFollowClick}
                                disabled={isAnimating}
                                className={clsx(
                                    'py-[6px] px-[12px] text-[14px] rounded-full border transition-all duration-300 ease-in-out',
                                    {
                                        'border-[#242424] text-[#242424] bg-white': !isFollowing,
                                        ' text-[#242424] ': isFollowing,
                                        'opacity-50': isAnimating
                                    }
                                )}
                            >
                                {isAnimating ? (isFollowing ? "Unfollowing..." : "Following...") : (isFollowing ? "Following" : "Follow")}
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center font-gt-super'>
                        <div className='text-[#6B6B6B] text-[14px]'>
                            12 min read
                        </div>
                        <span className='px-[8px] mt-[1px] text-[#6B6B6B] h-full'>.</span>
                        <div className='text-[#6B6B6B] flex items-center text-[14px]'>
                            {blogPost.date}
                        </div>
                    </div>
                </div>
                {!showAIButton ?
                    <div className="relative inline-block">
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                            New
                        </span>
                        <button
                            onClick={onAIButtonClick}
                            className='py-[6px] px-[12px] text-[14px] rounded-full border-[#242424] border cursor-pointer'>
                            AI Summary
                        </button>
                    </div>
                    : <div className="relative inline-block">
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                            New
                        </span>
                        <button
                            onClick={onBackClick}
                            className="py-[6px] px-[12px] text-[14px] rounded-full border-[#242424] border cursor-pointer">
                            Back
                        </button>
                    </div>}
            </div>
        </div>
    );
}

function FeatureBar() {
    return <div className='mt-[32px] px-[3px] py-[8px] max-w-[680px] mx-auto '>
        <div className='flex border-[#F2F2F2] border-t border-b justify-between'>
            <div className='flex'>
                <div className='flex items-center w-[74px]'>
                    <LightClap />
                    <span className='text-[#6B6B6B] text-[13px]'>{blogPost.likes}</span>
                </div>
                <div className='flex items-center'>
                    <MessageOutlineSvg />
                    <span className='text-[#6B6B6B] text-[13px]'>{blogPost.comments}</span>
                </div>
            </div>
            <div className='flex items-center'>
                <BookmarkSvg />
                <PlaySvg />
                <ShareSvg />
                <HamburgerSvg />
            </div>
        </div>
    </div>;
}

function Content() {
    return (
        <div className="font-serif text-[20px] h-screen mt-[1.70em] max-w-[680px] mx-auto fade-in-up">
           {blogPost.content}
        </div>
    );
}

const AIContent = ({ summary }: { summary: string }) => {
    return (
        <div className='text-[20px] font-serif mt-[1.70em]  max-w-[680px] mx-auto fade-in-up'>
            <h2 className="  text-xl font-bold text-center mb-5">AI Summary</h2>
            <p className="text-md mt-2">{summary} {!summary && 'In today’s fast-paced creative world, it’s easy to lose sight of purpose and passion. This article encourages creatives to pause annually and reflect deeply on their journey by asking eight essential questions about inspiration, fulfillment, values, and growth. Through honest self-inquiry, artists can reconnect with their authentic creative voice, avoid burnout, and rediscover joy in the process—not just the outcome. The piece emphasizes that staying true to oneself is more meaningful than chasing perfection or external validation.'} </p>

        </div>
    );
};

function ScanningAnimation() {
    return (
        <div className="fixed left-0 right-0 bottom-44 flex justify-center items-center bg-opacity-50">
            <div className="scanner-container relative w-[80%] max-w-[700px] h-[400px]  rounded-lg  overflow-hidden">
                <div className="scanner-line absolute top-0 left-0 w-full h-[4px] bg-[#1e90ff] animate-scan"></div>
                <div className="page-text p-[20px] font-sans text-[#333] leading-[1.5]">

                </div>
            </div>
        </div>
    );
}



// function TalkToBlog({ blogText }: { blogText: string }) {
//     const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
//     const [input, setInput] = useState("");

//     const handleSend = () => {
//         if (!input.trim()) return;

//         // Add user message
//         const newMessages = [...messages, { role: "user", text: input }];
//         setMessages(newMessages as any);
//         setInput("");

//         // Simulate AI response (replace with actual logic later)
//         setTimeout(() => {
//             const aiReply = "This is a simulated answer based on your blog content.";
//             setMessages((prev) => [...prev, { role: "ai", text: aiReply }]);
//         }, 1000);
//     };

//     return (
//         <div className="max-w-[680px] mx-auto mt-6 p-4 border rounded-lg shadow-md bg-white">
//             <h2 className="text-lg font-semibold mb-3">💬 Talk to this blog</h2>
//             <div className="h-[300px] overflow-y-auto mb-3 border p-2 rounded text-sm bg-gray-50">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
//                         <span
//                             className={`inline-block px-3 py-1 rounded ${msg.role === "user" ? "bg-green-200" : "bg-blue-200"
//                                 }`}
//                         >
//                             {msg.text}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//             <div className="flex gap-2">
//                 <input
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Ask something about the blog..."
//                     className="flex-1 px-3 py-2 border rounded"
//                 />
//                 <button
//                     onClick={handleSend}
//                     className="px-4 py-2 bg-[#242424] text-white rounded hover:bg-black transition"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }


// Adding the @keyframes animation for the scanning effect
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes scan {
      0% { top: 0; }
      100% { top: 100%; }
  }
`, styleSheet.cssRules.length);

function ShareSvg() {
    return (
        <div className='text-[#6B6B6B] hover:text-black transition-colors duration-200 py-3 mr-[24px]'>
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15.218 4.931a.4.4 0 0 1-.118.132l.012.006a.45.45 0 0 1-.292.074.5.5 0 0 1-.3-.13l-2.02-2.02v7.07c0 .28-.23.5-.5.5s-.5-.22-.5-.5v-7.04l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.79a.42.42 0 0 1 .068.498m-.106.138.008.004v-.01zM16 7.063h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11c-1.1 0-2-.9-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.15.5.5 0 0 1 .15.35.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9v-10.2c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1" clip-rule="evenodd"></path></svg>
        </div>
    )
}

function BookmarkSvg() {
    return <div className='text-[#6B6B6B] hover:text-black transition-colors duration-200 py-3 mr-[24px]'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="bk"><path fill="currentColor" d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4z"></path></svg>
    </div>
}

function HamburgerSvg() {
    return <div className='text-[#6B6B6B] hover:text-black transition-colors duration-200 py-3 px-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4.385 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41m5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59s1.02-.2 1.41-.59c.4-.39.59-.86.59-1.41s-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59s-.58.86-.58 1.41m5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59s1.03-.2 1.42-.59.58-.86.58-1.41-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59s-.58.86-.58 1.41" clip-rule="evenodd"></path></svg>
    </div>
}

function LightClap() {
    return <div className='text-[#6B6B6B] hover:text-black transition-colors duration-200 px-1'>
        <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="clap"><path fill-rule="evenodd" d="M11.37.828 12 3.282l.63-2.454zM13.916 3.953l1.523-2.112-1.184-.39zM8.589 1.84l1.522 2.112-.337-2.501zM18.523 18.92c-.86.86-1.75 1.246-2.62 1.33a6 6 0 0 0 .407-.372c2.388-2.389 2.86-4.951 1.399-7.623l-.912-1.603-.79-1.672c-.26-.56-.194-.98.203-1.288a.7.7 0 0 1 .546-.132c.283.046.546.231.728.5l2.363 4.157c.976 1.624 1.141 4.237-1.324 6.702m-10.999-.438L3.37 14.328a.828.828 0 0 1 .585-1.408.83.83 0 0 1 .585.242l2.158 2.157a.365.365 0 0 0 .516-.516l-2.157-2.158-1.449-1.449a.826.826 0 0 1 1.167-1.17l3.438 3.44a.363.363 0 0 0 .516 0 .364.364 0 0 0 0-.516L5.293 9.513l-.97-.97a.826.826 0 0 1 0-1.166.84.84 0 0 1 1.167 0l.97.968 3.437 3.436a.36.36 0 0 0 .517 0 .366.366 0 0 0 0-.516L6.977 7.83a.82.82 0 0 1-.241-.584.82.82 0 0 1 .824-.826c.219 0 .43.087.584.242l5.787 5.787a.366.366 0 0 0 .587-.415l-1.117-2.363c-.26-.56-.194-.98.204-1.289a.7.7 0 0 1 .546-.132c.283.046.545.232.727.501l2.193 3.86c1.302 2.38.883 4.59-1.277 6.75-1.156 1.156-2.602 1.627-4.19 1.367-1.418-.236-2.866-1.033-4.079-2.246M10.75 5.971l2.12 2.12c-.41.502-.465 1.17-.128 1.89l.22.465-3.523-3.523a.8.8 0 0 1-.097-.368c0-.22.086-.428.241-.584a.847.847 0 0 1 1.167 0m7.355 1.705c-.31-.461-.746-.758-1.23-.837a1.44 1.44 0 0 0-1.11.275c-.312.24-.505.543-.59.881a1.74 1.74 0 0 0-.906-.465 1.47 1.47 0 0 0-.82.106l-2.182-2.182a1.56 1.56 0 0 0-2.2 0 1.54 1.54 0 0 0-.396.701 1.56 1.56 0 0 0-2.21-.01 1.55 1.55 0 0 0-.416.753c-.624-.624-1.649-.624-2.237-.037a1.557 1.557 0 0 0 0 2.2c-.239.1-.501.238-.715.453a1.56 1.56 0 0 0 0 2.2l.516.515a1.556 1.556 0 0 0-.753 2.615L7.01 19c1.32 1.319 2.909 2.189 4.475 2.449q.482.08.971.08c.85 0 1.653-.198 2.393-.579.231.033.46.054.686.054 1.266 0 2.457-.52 3.505-1.567 2.763-2.763 2.552-5.734 1.439-7.586z" clip-rule="evenodd"></path></svg>
    </div>
}
function MessageOutlineSvg() {
    return <div className='text-[#6B6B6B] hover:text-black transition-colors duration-200 px-1'>
        <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="nd"><path d="M18.006 16.803c1.533-1.456 2.234-3.325 2.234-5.321C20.24 7.357 16.709 4 12.191 4S4 7.357 4 11.482c0 4.126 3.674 7.482 8.191 7.482.817 0 1.622-.111 2.393-.327.231.2.48.391.744.559 1.06.693 2.203 1.044 3.399 1.044.224-.008.4-.112.486-.287a.49.49 0 0 0-.042-.518c-.495-.67-.845-1.364-1.04-2.057a4 4 0 0 1-.125-.598zm-3.122 1.055-.067-.223-.315.096a8 8 0 0 1-2.311.338c-4.023 0-7.292-2.955-7.292-6.587 0-3.633 3.269-6.588 7.292-6.588 4.014 0 7.112 2.958 7.112 6.593 0 1.794-.608 3.469-2.027 4.72l-.195.168v.255c0 .056 0 .151.016.295.025.231.081.478.154.733.154.558.398 1.117.722 1.659a5.3 5.3 0 0 1-2.165-.845c-.276-.176-.714-.383-.941-.59z"></path></svg>
    </div>
}

function PlaySvg() {
    return <div className='text-[#6B6B6B] hover:text-black transition-colors duration-200 py-3 mr-[24px]'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0m9-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m3.376 10.416-4.599 3.066a.5.5 0 0 1-.777-.416V8.934a.5.5 0 0 1 .777-.416l4.599 3.066a.5.5 0 0 1 0 .832" clip-rule="evenodd"></path></svg>
    </div>
}
