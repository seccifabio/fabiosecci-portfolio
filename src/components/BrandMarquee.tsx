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

export const BrandMarquee = () => {
  // Duplicate the list to create a seamless loop
  const doubledBrands = [...BRANDS, ...BRANDS];

  return (
    <div className="w-full overflow-hidden py-10 opacity-50 hover:opacity-100 transition-opacity duration-500">
      <motion.div 
        className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubledBrands.map((brand, index) => (
          <div key={index} className="flex-shrink-0">
            <img 
              src={getAssetPath(brand)} 
              alt="Brand Logo" 
              className="h-8 md:h-12 w-auto grayscale brightness-200 contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
