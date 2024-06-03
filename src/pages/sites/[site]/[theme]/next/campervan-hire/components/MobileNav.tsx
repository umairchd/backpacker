import { FC, useState } from "react";
import classes from "../CampervanHire.module.scss";
import { navigationLinksMiddle, navigationLinksRight } from "../utils";
import { FiX } from "react-icons/fi";

const MobileNav: FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={classes["nav-mobile"]}>
      <button
        className={`btn ${classes["navItem"]} ${classes["hamburger"]} openSideMobile`}
        type="button"
        onClick={handleShow}
      >
        Menu
      </button>
      <div
        className={`visible xl:invisible fixed inset-0 z-999 h-screen flex flex-col max-w-340px w-full bg-white transition-transform duration-300 ease-in-out border-r border-black/20 ${
          show ? "transform-none " : "-translate-x-full"
        }`}
        tabIndex={-1}
      >
        <div className="px-5 py-14">
          <button
            type="button"
            className={`${
              show ? "translate-x-full transition-all duration-300" : "-translate-x-50px  transition-all duration-300"
            } h-10 w-10 shrink-0 absolute z-10 right-50px top-4 sm:-right-3 sm:top-1 bg-white flex items-center justify-center shadow-box hover:shadow-none rounded-lg text-primary`}
            aria-label="Close mobile menu"
            onClick={handleClose}
          >
            <FiX className="text-primary shrink-0 text-xl" />
          </button>

          <ul className="list-group list-group-flush navbar-nav">
            {navigationLinksMiddle.map((menu) => (
              <li
                className="p-2 list-none m-0"
                key={menu.id}
              >
                <a href={menu.link}>
                  <h2 className="flex items-center gap-1">
                    <img
                      src={menu.icon}
                      alt={menu.text}
                      width={20}
                      height={20}
                      loading="eager"
                      style={{
                        marginRight: 10,
                      }}
                    />
                    {menu.text}
                  </h2>
                </a>
              </li>
            ))}

            {navigationLinksRight.map((menu) => (
              <li
                className="p-2 list-none m-0"
                key={menu.id}
              >
                <a href={menu.link}>
                  <h2 className="flex items-center gap-1">
                    <img
                      src={menu.icon}
                      alt={menu.text}
                      width={20}
                      height={20}
                      loading="eager"
                      style={{
                        marginRight: 10,
                      }}
                    />
                    {menu.text}
                  </h2>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {show && (
        <div
          className="bg-black/50 fixed inset-0 w-screen h-screen z-10"
          onClick={handleClose}
        />
      )}
    </div>
  );
};

export default MobileNav;
