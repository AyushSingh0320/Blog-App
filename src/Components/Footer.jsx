// import react from 'react';
const Footer = () => {
    return (
      <section className="relative overflow-hidden py-3 bg-gray-600 border border-t-2 border-t-black px-2 sm:px-0">
      <div className="relative sm:px-36 px-6 py-2.5 flex flex-col gap-5 justify-between md:flex-row text-secondary bg-gray-600 ">
  
        <div className="flex flex-col items-center font-semibold text-[17px] text-black">
          <p>Designed & Developed by</p>
          <div className="flex gap-1 items-center">
            <p>&nbsp;Ayush Singh</p> <p>2025</p>
          </div>
        </div>
  
        {/* Social links always visible */}
        <div className="gap-5 font-semibold tracking-wide flex text-black justify-center md:justify-end">
          <div className="group flex flex-col justify-center cursor-pointer ">
            <a href="https://github.com/Ayushsingh0320" target="_blank" rel="noreferrer" className="!text-black hover:!underline hover:!text-black visited:!text-black focus:!text-black active:!text-black font-semibold">GITHUB</a>
            <div className="h-[1.5px] w-auto bg-secondary opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"></div>
          </div>
          <div className="group flex flex-col justify-center cursor-pointer ">
            <a href="" target="_blank" rel="noreferrer" className="!text-black hover:!underline hover:!text-black visited:!text-black focus:!text-black active:!text-black font-semibold">LINKEDIN</a>
            <div className="h-[1.5px] w-auto bg-secondary opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"></div>
          </div>
        </div>
  
  
      </div>
    </section>
    )
  }
  
  export default Footer;
