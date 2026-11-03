import React, { Fragment } from 'react';
export function PartnersBar() {
  const partners = ['DLF', 'Godrej', 'Lodha', 'Prestige'];
  return (
    <section className="bg-olive py-10 md:py-0 md:h-[140px] flex items-center border-y border-gold/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="md:w-1/3 shrink-0 text-center md:text-left">
            <h3 className="font-sans font-light text-[16px] tracking-widest text-gold uppercase max-w-[400px]">
              We are official partners with
              <br />
              top developers in India
            </h3>
          </div>

          <div className="flex-1 flex flex-wrap justify-center md:justify-end items-center gap-6 md:gap-10">
            {partners.map((partner, index) =>
            <Fragment key={partner}>
                <div className="text-white font-sans font-bold text-xl md:text-2xl tracking-wider uppercase">
                  {partner}
                </div>
                {index < partners.length - 1 &&
              <div className="hidden md:block w-px h-10 bg-gold/50" />
              }
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>);

}
