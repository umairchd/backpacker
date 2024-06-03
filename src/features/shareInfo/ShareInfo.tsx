/* eslint-disable etc/no-deprecated */
import { FC, useState } from "react";

import clsx from "clsx";
import classes from "./ShareInfo.module.scss";

interface ShareInfoProps {
  url?: string;
  title?: string;
  className?: string;
}

const ShareInfo: FC<ShareInfoProps> = ({ url, title, className }) => {
  const [titleCopy, setTitleCopy] = useState("Copy");

  const emailSubject =
    "Pinky promise this isn’t spam…just an awesome comp! 😜🌏";
  const emailBody = `
    Hey!

    I just entered Travello’s Million Dollar Traveller Competition for my chance to win $1 Million Dollars!

    Anyway, it got me thinking; where could $1 Million take me… and who would I travel with? 🤔

    So, let’s double our chances and have twice the fun!

    Enter for your chance to win 🤞: ${url}
  `;

  const shareContent = [
    {
      name: "Facebook",
      icon: "fa fa-facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      title: "Share",
    },
    {
      name: "Email",
      icon: "fa fa-envelope",
      url: `mailto:?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`,
      title: "Email",
    },
  ];

  const copyToClipboard = (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setTitleCopy("Copied");

    setTimeout(() => {
      setTitleCopy("Copy");
    }, 2000);
  };

  return (
    <div className={clsx([classes["share-info-container"], className])}>
      <div className={classes["share-title"]}>{title}</div>
      <ul className={classes["share-info"]}>
        {shareContent.map((item) => (
          <li className="list-none m-0" key={item.name}>
            <a
              className="icon"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <i className={item.icon}></i>
              {item.title}
            </a>
          </li>
        ))}
        <li className="list-none m-0">
          <a
            className="icon"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard(url);
            }}
          >
            <i className="fa fa-link"></i>
            {titleCopy}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ShareInfo;
