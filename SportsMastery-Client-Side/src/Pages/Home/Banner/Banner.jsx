// import React from 'react';

const Banner = () => {
    return (
        <div className="carousel w-full h-[530px] mb-5">
            <div id="slide1" className="carousel-item relative w-full">
                <img src='https://media.istockphoto.com/id/685899716/photo/a-futuristic-sports-concept-of-a-cricket-ball-lit-with-neon-markings-on-a-futuristic-spotlit.jpg?s=612x612&w=0&k=20&c=44to1y8tMlSAjylG7zeE5ptu95f4Epdy5iaR4viWW74=' className="w-full" />
                <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-5 pl-12 w-10/12 lg:w-8/12'>
                        <h2 className='text-3xl lg:text-4xl font-semibold font-mono'>Unlock Your Athletic Potential and Excel in Your Sport</h2>
                        <p className="font-mono text-base text-justify lg:text-lg">Experience top-notch coaching, facilities, and personalized training at SportsMastery. Elevate your skills, push your limits, and achieve greatness.</p>
                        <div className='block md:flex '>
                            <a href="#slide4" className="btn btn-accent mr-5">Previous </a>
                            <a href="#slide2" className="btn btn-outline btn-accent mt-3 md:mt-0  md:mb-0">Next Page</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src='https://t4.ftcdn.net/jpg/04/70/40/25/360_F_470402550_Qp657FCmUI0QOhybB5pJHpAa04cauzYQ.jpg' className="w-full " />
                <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-5 pl-12 w-10/12 lg:w-8/12'>
                        <h2 className='text-3xl lg:text-4xl font-semibold font-mono'>Join a Passionate Community of Winners and Achievers</h2>
                        <p className="font-mono text-base text-justify lg:text-lg">Become part of a passionate athlete community at SportsMastery. Train with professionals, receive expert guidance, and reach new heights together.</p>
                        <div className='block md:flex'>
                            <a href="#slide1" className="btn btn-accent mr-5">Previous</a>
                            <a href="#slide3" className="btn btn-outline btn-accent mt-3 md:mt-0 md:mb-0">Next Page</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src='https://wallpapercrafter.com/desktop2/774819-Sport-Explore-white-black-surface-badminton-two.jpg' className="w-full " />
                <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-5 pl-12 w-10/12 lg:w-8/12'>
                        <h2 className='text-3xl lg:text-4xl font-semibold font-mono'>Embrace the Thrill of Victory</h2>
                        <p className="font-mono text-base text-justify lg:text-lg">Ignite your competitive spirit with SportsMastery. Our comprehensive training programs cater to all levels. Experience the exhilaration of success.</p>
                        <div className='block md:flex'>
                            <a href="#slide2" className="btn btn-accent mr-5">Previous</a>
                            <a href="#slide1" className="btn btn-outline btn-accent mt-3 md:mt-0 md:mb-0">Next Page</a>
                        </div>
                    </div>
                </div>
                
            </div>
           
        </div>

    );
};

export default Banner;