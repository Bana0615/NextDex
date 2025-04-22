import React from "react";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";
//Helpers
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
//Styles
import styles from "@/public/styles/components/SclBadges.module.css";

const SclBadge = ({
  name,
  variant = "",
  badgeOverwrite = "",
  imgSrc = "",
  needsDarkText = false,
  fullWidth = false,
}: {
  name: string;
  variant?: string;
  badgeOverwrite?: string;
  imgSrc?: string;
  needsDarkText?: boolean;
  fullWidth?: boolean;
}) => {
  // Base classes that are always applied
  const badgeClasses = [
    "d-flex",
    "align-items-center",
    styles.baseBadge,
    styles[badgeOverwrite],
  ];

  // Add classes conditionally
  if (variant) {
    badgeClasses.push(variant);
  }

  if (fullWidth) {
    badgeClasses.push("w-100", "justify-content-center"); // Add full width and centering only if true
  } else {
    badgeClasses.push("d-inline-flex");
  }

  // Add dark text if needed
  if (needsDarkText) {
    badgeClasses.push(styles.textDark);
  }

  return (
    <Badge
      className={badgeClasses.join(" ")}
      bg={variant ? variant : "success"}
    >
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={`${name} icon`}
          height={16}
          width={16}
          style={{
            height: "1.1em",
            width: "auto",
            marginRight: "0.3em",
          }}
        />
      )}
      {capitalizeFirstLetter(name)}
    </Badge>
  );
};

export default SclBadge;
