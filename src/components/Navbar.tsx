import { Logo } from './Logo'

const Navbar = () => {
    return (
        <div className="px-6 h-14 flex flex-row items-center border-b border-[#F2F2F2]  ">
            <div className='flex-1 '>
                <div className='flex items-center '>
                    <Logo />
                    <SearchBox />
                </div>

            </div>
            <div className='flex gap-8 items-center' >
                    <WriteSvg />
                    <NotificationSvg />
                    <Profile />
                </div>
        </div>
    )
}
export default Navbar

function SearchBox() {
    return <div className=' px-[24px]  '>
        <div className="flex items-center border-transparent px-3 py-2   max-w-md bg-[#F9F9F9]  rounded-full w-[240px]">
            <SearchSVG />
            <input type="text" placeholder="Search" className=" outline-none text-[13px] text-md px-2 placeholder:text-[15px] placeholder-[#6B6B6B]" />
        </div>
    </div>
}

function SearchSVG() {
    return (
        <div className="text-[#6B6B6B] focus:text-black cursor-pointer pr-1  flex items-center justify-center mb-[2px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z" clip-rule="evenodd"></path></svg>
        </div>
    )
}

function WriteSvg() {
    return (
        <div className=' text-[#6B6B6B] hover:text-black flex gap-2 items-end '>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg>
            <p className='font-gt-super text-[14px] '>Write</p>
        </div>
    )
}

function NotificationSvg() {
    return (
        <div className=' text-[#6B6B6B] hover:text-black '>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Notifications"><path stroke="currentColor" stroke-linecap="round" d="M15 18.5a3 3 0 1 1-6 0"></path><path stroke="currentColor" stroke-linejoin="round" d="M5.5 10.532V9a6.5 6.5 0 0 1 13 0v1.532c0 1.42.564 2.782 1.568 3.786l.032.032c.256.256.4.604.4.966v2.934a.25.25 0 0 1-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.934c0-.363.144-.71.4-.966l.032-.032A5.35 5.35 0 0 0 5.5 10.532Z"></path></svg>
        </div>
    )
}

function Profile(){
    return <div className='rounded-full w-full h-full flex items-center justify-center '>
        <img src='https://miro.medium.com/v2/resize:fill:27:27/0*ZXLpDkGiGKJYUYTE' alt='profile' width={32} height={32} className=' rounded-full  cursor-pointer' />
    </div>
}