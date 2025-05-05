import { blogPost } from "../utils/constants"

const Sidebar = () => {
  return (
    <div className='border-[#F2F2F2] pt-[40px] border-l h-screen pl-[clamp(24px,_-1056px_+_100vw,_40px)] max-w-[368px] min-w-[368px] w-[368px] ">
'>
  <h2 className='text-[16px] font-[500] pb-2'>Staff Picks</h2>
    <ShortBlog />
    <ShortBlog />
    <ShortBlog />
    <h2 className='text-[16px] font-[500] pb-6 mt-10'>Recommended topics</h2>
    <TagPills />
</div>
  )
}

export default Sidebar

function ShortBlog(){
  return  <div className="flex flex-col  gap-2 mt-4">
  <div className="flex gap-2 ">
  <img src={blogPost.url}  width="20" height="20" loading="lazy" alt='profile pic' className="rounded-full " />
  <p className="text-[13px] text-[#242424]">{blogPost.name}</p>
  </div>
  <a href='/blog' className="mt-1 text-[16px] font-bold leading-[20px] text-[#242424]">{blogPost.heading}</a>
  <p className="mt-2 text-[#6B6B6B] text-[13px]">{blogPost.date}</p>
</div>
}

const topics = [
  "Productivity",
  "Politics",
  "Cryptocurrency",
  "Python",
  "Psychology",
  "Money",
  "Health",
];

const TagPills = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {topics.map((topic, index) => (
        <div
          key={index}
          className="bg-[#F2F2F2] text-[#242424] px-4 py-2 rounded-full text-sm font-gt-super"
        >
          {topic}
        </div>
      ))}
    </div>
  );
};