import { FC } from "react";
import { useCampervanLinks } from "@@/pages/Layout/Campervans/hooks";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const CampervanHire: FC = () => {
  const images = "https://assets.backpackerdeals.com/uploads/content/campervan-banner.jpg";

  const campervanChannel = useCampervanLinks();

  const ImageCampervan = (
    <a
      href={`https://${campervanChannel.key}.com/campervan-hire`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Campervan Hire"
    >
      <OptimizedHeroImage
        className="rounded-lg"
        src={images}
        alt="campervan"
      />
    </a>
  );

  return (
    <div className="mt-30px mb-15px md:mt-45px">
      <div className="grid grid-cols-1 1141px:grid-cols-2 items-center">
        <div className="1141px:pr-30px">
          <h2 className="text-xl md:text-28px font-bold leading-1.3 mb-5">Campervan Hire</h2>
          <div className="hidden max-1141-block my-15px">{ImageCampervan}</div>
          <p className="max-1141-text-sm max-1140-mb-15px leading-1.5 text-justify text-base max-992-hidden mb-10">
            Embark on a unique adventure with our campervan hire services. Explore your chosen destinations at your own
            pace, combining comfort and mobility for an unforgettable travel experience. Whether you&apos;re craving a
            road trip across scenic landscapes or a flexible getaway, our campervan rentals provide the freedom to
            create your own journey.
          </p>

          <p className="max-1141-text-sm max-1140-mb-15px leading-1.5 text-justify text-base 993px:hidden ">
            Book a campervan with Backpacker Deals and explore your way. We have a best price guarantee, live travel
            agents to help with your booking and you get a $50 experience voucher whenever you book!
          </p>

          <a
            href={`https://${campervanChannel.key}.com/campervan-hire`}
            className="text-base leading-1.5 max-w-200px block text-center px-3 py-6px font-bold capitalize rounded-34px text-white w-full h-38px outline-none border border-primary bg-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book A Campervan
          </a>
        </div>

        <div className="hidden 1141px:block">{ImageCampervan}</div>
      </div>
    </div>
  );
};

export default CampervanHire;
