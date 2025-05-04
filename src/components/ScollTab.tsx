import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type ScrollableTabsProps = {
  tabs?: string[];
};

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs = ['For you',
    'Following',

   'Featured',
    'Relationships',
    'Machine Learning',
    'Writing',
    'Self Improvement',
    'Technology',
    'Programming',
    'Data Science'],
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const tabRef = useRef<HTMLButtonElement | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isScrolledToStart, setIsScrolledToStart] = useState(true);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setIsScrolledToStart(scrollLeft === 0);
        setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);



  return (
    <div className="relative w-full max-w-[680px]   ">
    <div className="relative py-1">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-2 border-[#F2F2F2] border-b-[1px]"
        style={{ scrollBehavior: 'smooth', paddingRight: '40px' }} // space for the blur + chevron
        onScroll={() => {
          if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setIsScrolledToStart(scrollLeft === 0);
            setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth - 1); // minor buffer
          }
        }}
      >
        <div className='flex justify-center items-center pb-3   '>
          <AddSvg />
        </div>

        {tabs.map((tab, index) => (
          <button
          ref={tabRef}
            key={index}
            onClick={() => setActiveTab(index)}
            className={`whitespace-nowrap pb-[16px] mx-4 text-[14px] text-[#6B6B6B] border-b-[1px] transition-all ${
              activeTab === index
                ? 'border-black text-black'
                : 'border-transparent hover:text-black'
            }`}
            style={{ flex: '0 0 auto' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right blur overlay */}
      {!isScrolledToEnd && (
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />
      )}

      {/* Right button */}
      {!isScrolledToEnd && (
        <button
          onClick={() => {
            console.log(tabRef.current)
            if (scrollRef.current && tabRef.current) {
              const tabWidth = tabRef.current.offsetWidth;
              scrollRef.current.scrollBy({
                left: (tabWidth+20), // scroll almost one screen
                behavior: 'smooth',
              });
            }
          }}
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.75) 25%, rgba(255, 255, 255, 0.9) 50%, rgb(255, 255, 255) 75%)',
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 z-20 bg-white pb-5 "
        >
          <ChevronRight size={20} className="text-[#6B6B6B] hover:text-black" />
        </button>
      )}

      {/* Left button */}
      {!isScrolledToStart && (
        <button
          onClick={() => {
            if (scrollRef.current && tabRef.current) {
              const tabWidth = tabRef.current.offsetWidth;
              scrollRef.current.scrollBy({
                left: -(tabWidth +20),
                behavior: 'smooth',
              });
            }
          }}
          style={{
            background: 'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.75) 25%, rgba(255, 255, 255, 0.9) 50%, rgb(255, 255, 255) 75%)',
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 z-20 pb-5"
        >
          <ChevronLeft size={20}  className="text-[#6B6B6B] hover:text-black "  />
        </button>
      )}
    </div>
  </div>

  );
};

export default ScrollableTabs;

// AddSvg component
function AddSvg() {
  return (
    <div className="rounded-full hover:bg-gray-200 text-gray-600 hover:text-black w-5 h-5 flex items-center justify-center cursor-pointer pb-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        fill='currentColor'
        className="jb adu js"
      >
        <path
          fillRule="evenodd"
          d="M9 9H3v1h6v6h1v-6h6V9h-6V3H9z"
        ></path>
      </svg>
    </div>
  );
}
