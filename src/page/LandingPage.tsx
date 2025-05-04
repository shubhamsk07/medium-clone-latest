import {  ReactNode, useEffect, useRef, useState } from 'react'
import {Logo} from "../components/Logo"

const LandingPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    return (
        <div className='w-full h-screen overflow-hidden bg-[#F7F4ED] '>
            <nav className='border-[#242424] border-b-[1px] px-[48px] py-[18px] lg:px-[173px] flex justify-between items-center'>
                <Logo />
                <div className='flex gap-[26px] justify-between items-center font-gt-super text-[14px]  leading-[20px] mt-[1px]'>
                    <a className='cursor-pointer font-[400] '>Our story</a>
                    <a href='/home' className='cursor-pointer'>Membership</a>
                    <a href='/home' className='cursor-pointer'>Write</a>
                    <a href='/home' className='cursor-pointer'>Sign in</a>
                    <button
                        onClick={() => {
                            setIsPopupOpen(true);
                            console.log("clicked")
                        }}
                        className="bg-[#191919] cursor-pointer border border-[#191919] rounded-full px-[15px] py-2 font-[500] text-white font-get-super">
                        Get started
                    </button>
                </div>
            </nav>
            <Hero setIsPopupOpen={setIsPopupOpen} />
            <Footer />
            {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
        </div>
    )
}

export default LandingPage

function Popup({ onClose }: { onClose: () => void }) {
    const popupref = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        function handleClickOutside(event:MouseEvent){
            if(popupref.current && !popupref.current.contains(event.target as Node)){
                onClose();
            }
        }
document.addEventListener('mousedown',handleClickOutside)
return ()=>{
    document.removeEventListener('mousedown',handleClickOutside)
}
    },[onClose])
    return (
        <div className="fixed inset-0 z-50 bg-white/95 flex justify-center items-center">
            <div ref={popupref} className="relative bg-white lg:w-[678px] min-h-[695px] rounded-[4px]  [box-shadow:0px_2px_10px_rgba(0,0,0,0.15)] p-6 flex flex-col items-center">
                <div className="absolute top-3 right-3 cursor-pointer " onClick={onClose}>
                    <CloseSvg />
                </div>
                <p className="text-[28px] leading-[32px] [letter-spacing:-0.03em] text-center mb-4 font-serif mt-23">
                    Join Medium.
                </p>
                <div className='flex flex-col mt-16 gap-3'>
                    <AuthButton text="Sign up with Google" icon={<GoogleSvg />} />
                    <AuthButton text="Sign up with Facebook" icon={<FacebookSvg />} />
                    <AuthButton text="Sign up with email" icon={<EmailSvg />} />
                </div>
                <div className='mt-10'>
                    <p className='text-black'>Already have an account? <button className='text-[#1A8917] font-extrabold [letter-spacing:-0.01em]'>Sign in</button></p>
                </div>
                <div className=' mt-24 w-[450px]'>
                    <p
                        style={{ wordSpacing: '-0.09em' }}
                        className='text-[#6B6B6B] leading-[20px] text-[13px] text-center'>Click “Sign up” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</p>
                </div>
            </div>
        </div>
    );
}

function AuthButton({ text, icon }: { text: string, icon: ReactNode }) {
    return (<a href='/home' className="text-center border rounded-full border-black py-2 px-2  cursor-pointer w-[300px] flex justify-center items-center ">
        <div className="flex items-center justify-between w-full ">
            {icon}
            <span
                style={{ wordSpacing: '-0.09em' }}
                className="text-[16px] text-[#242408] font-[400]">{text}</span>
            <div className='w-[24px]'></div>
        </div>

    </a>)
}


function EmailSvg() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="bt"><g id="email-icon"><g id="Group 10123" stroke="#242424"><rect id="Rectangle 1488" width="17" height="13" x="3.5" y="5.505" rx="1"></rect><path id="Vector 107" stroke-linecap="round" d="m3.5 8.005 8.5 6 8.5-6"></path></g></g></svg>
}
function GoogleSvg() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="bt"><g id="google"><g id="google-vector" fillRule="evenodd" clipRule="evenodd"><path id="Shape" fill="#4285F4" d="M20.64 12.205q-.002-.957-.164-1.84H12v3.48h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615"></path><path id="Shape_2" fill="#34A853" d="M12 21c2.43 0 4.468-.806 5.957-2.18L15.05 16.56c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H3.958v2.332A9 9 0 0 0 12.001 21"></path><path id="Shape_3" fill="#FBBC05" d="M6.964 13.712a5.4 5.4 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71V7.96H3.957A9 9 0 0 0 3 12.002c0 1.452.348 2.827.957 4.042z"></path><path id="Shape_4" fill="#EA4335" d="M12 6.58c1.322 0 2.508.455 3.441 1.346l2.582-2.58C16.463 3.892 14.427 3 12 3a9 9 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71"></path></g></g></svg>
}

function FacebookSvg() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="bt"><g id="facebook"><g id="facebook-vector"><path fill="#1877F2" d="M22 12.002c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54v-2.891h2.54V9.799c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.989c4.78-.75 8.437-4.888 8.437-9.879"></path><path fill="#fff" d="m15.893 14.893.443-2.891h-2.773v-1.876c0-.79.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.196-2.238-.196c-2.284 0-3.777 1.385-3.777 3.89v2.204h-2.54v2.89h2.54v6.989a10 10 0 0 0 3.124 0v-6.988z"></path></g></g></svg>
}

function CloseSvg() {

    return <div className='text-gray-500 hover:text-black transition-colors duration-200'>
        <svg width="29" height="29" fill='currentColor' className="ie fq if hm"><path fillRule="evenodd" d="m20.13 8.11-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61"></path></svg>
    </div>
}

function Hero({setIsPopupOpen}: { setIsPopupOpen: (isOpen: boolean) => void }) {
    return <div  className='relative'>
        <div className='mt-[100px] pt-9 text-[#242424] max-w-[1192px] lg:px-[170px]'>
            <h2
                style={{ wordSpacing: '-0.001em' }}
                className='text-[120px] pb-[48px] tracking-tighter font-serif leading-[100px]  '> Human <br />
                stories & ideas</h2>
            <p style={{ wordSpacing: '-0.035em' }} className='text-[22px] px-[2px] leading-[28px] mt-1 font-[400] text-[#242424] mb-[48px]'>A place to read, write, and deepen your understanding</p>
            <button
                onClick={() => {
                    setIsPopupOpen(true);
                    console.log("clicked")
                }}
                className="bg-[#191919] cursor-pointer border border-[#191919] rounded-full px-[20px] py-2 font-[500] text-white text-[20px] leading-[28px] w-[196px]  font-gt-super">Start reading</button>
        </div>
        <div className=' absolute right-0 -top-[88px] z-10'>
            <img width={460} height={600} loading='eager' src='/image.png' alt='hero'  />
        </div>
    </div>
}

function Footer(){
    return <div className='w-full  relative h-[100px] z-50 bg-[#F7F4ED] border-t border-[#242424] flex justify-center items-center mt-[75px]'>
<div className='flex gap-[16px] items-center  max-w-[680px] text-[13px] leading-[20px] text-[#6B6B6B] font-[400] w-full mb-[29px] font-sohne pb-[1.5px]'>
<p>Help</p>
<p>Status</p>
<p>About</p>
<p>Careers</p>
<p>Press</p>
<p>Blog</p>
<p>Privacy</p>
<p>Rules</p>
<p>Terms</p>
<p style={{wordSpacing:'+0.001em'}}>Text to speech</p>

</div>
    </div>
}