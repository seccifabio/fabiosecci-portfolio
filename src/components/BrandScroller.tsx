import React from 'react';
import { motion } from 'framer-motion';

import { getAssetPath } from '../lib/utils';

const BRANDS = [
  '/Brands/0BgrnDtZsiw89IJFIiuvrbwJiKI.avif',
  '/Brands/1ULi72BQs2VaBHnaOeD4C3y8Fw.avif',
  '/Brands/33KRGeiC8U6lfCaqVJg5xNslhg.avif',
  '/Brands/TIcCzBe5SPt8fv3hVaXsMs6fGQo.avif',
  '/Brands/TOIQFStYoBqXsOH4j07VJf0B8.avif',
  '/Brands/TQMgrkzQfI8zdVPsUn6emniKzWE.avif',
  '/Brands/t8kRBBfnOfCWVblGlnUByGnWTvI.avif',
  '/Brands/vcfRGgsVP2bZBoEc1txx8NZK3z8.avif',
  '/Brands/z8hpkWybHzbkbD9oBb7GaeskoA.avif',
];

export const BrandScroller = () => {
  // Duplicate the brands to create a seamless loop
  const duplicatedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-10" />
      
      <motion.div 
        className="flex items-center gap-12 md:gap-24 whitespace-nowrap"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div key={index} className="flex-shrink-0">
            <img 
              src={getAssetPath(brand)} 
              alt="Brand Logo" 
              className="h-10 w-10 object-contain opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
