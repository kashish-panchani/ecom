import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-600" >
      <div className="container mx-auto pt-2 sm:py-8 px-4 ">
        <div className="flex justify-start gap-4  ">
          <div className=" w-[28%] xl:text-xl lg:w-1/3 text-[8px] md:text-sm lg:text-lg sm:text-sm sm:w-1/4 lg:text-left mb-4 lg:mb-0">
            <h4 className="xl:text-xl  lg:text-lg text-[7px] md:text-sm sm:text-xs font-bold mb-4">GET TO KNOW US</h4>
            <ul>     
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Amazon Science</li>
            </ul>
          </div>
          <div className=" w-[28%] xl:text-xl lg:w-1/3 text-[8px] md:text-sm lg:text-lg sm:text-sm sm:w-1/4 lg:text-left mb-4 lg:mb-0">
            <h4 className="xl:text-xl lg:text-lg text-[7px] sm:text-xs  md:text-sm font-bold mb-4">CONNECT WITH US</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div className=" w-[28%] xl:text-xl lg:w-1/3 text-[8px] md:text-sm lg:text-lg sm:text-sm  sm:w-1/4 lg:text-left">
            <h4 className="xl:text-xl lg:text-lg text-[7px] sm:text-xs md:text-sm  font-bold mb-4">MAKE MONEY WITH US</h4>
            <ul>
              <li>Sell on Myntra</li>
              <li>Sell under MyntraAccelerator</li>
              <li>Myntra Global Selling</li>
              <li>Become an Affiliate</li>
            </ul>
          </div>
          <div className=" w-[28%] xl:text-xl lg:w-1/3 text-[8px]  md:text-sm lg:text-lg sm:text-sm  sm:w-1/4 lg:text-left ">
            <h4 className="xl:text-xl lg:text-lg text-[7px]  sm:text-xs md:text-sm font-bold mb-4">LET US HELP YOU</h4> 
            <ul>
              <li>Contact us</li>
              <li>Your Account</li>
              <li>Returns Centre</li>
              <li>100% Purchase Protection</li>
            </ul>
          
          </div>
          
        </div>
        <div className="my-10">
        <h1 className="font-bold xl:text-lg lg:text-lg md:text-sm sm:text-xs  text-[7px] ">MYNTRA APP</h1>
        <p className="xl:text-xl lg:text-lg md:text-sm sm:text-sm  text-[8px]">Myntra, India’s no. 1 online fashion destination justifies its fashion relevance by bringing something new and chic to the table on the daily. Fashion trends seem to change at lightning speed, yet the Myntra shopping app has managed to keep up without any hiccups. In addition, Myntra has vowed to serve customers to the best of its ability by introducing its first-ever loyalty program, The Myntra Insider. Gain access to priority delivery, early sales, lucrative deals and other special perks on all your shopping with the Myntra app. Download the Myntra app on your Android or IOS device today and experience shopping like never before!</p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="w-full lg:w-1/2 lg:text-left text-center">
            <div className="flex items-center justify-center">
              <img
                src="../myntralogo.png"
                alt="Amazon Logo"
                className="h-10 sm:h-16 mr-2 "
              />
              </div>
              <div className="text-center">
              <span className="xl:text-xl lg:text-lg md:text-sm sm:text-sm text-[8px] font-bold ">
                © 1996-2023, Myntra.com, Inc. or its affiliates
              </span>
              </div>
            </div>
          </div>
        </div>
     
    </footer>
  );
}

export default Footer;

