import React from "react";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";
//Helpers
import { capitalizeFirstLetter } from "@/helpers/_silabs/capitalizeFirstLetter";
//Styles
import styles from "@/public/styles/modules/typeBadges.module.css";

const PokeBadge = ({
  name,
  className = "",
  imgSrc = "",
  fullWidth = true,
}: {
  name: string;
  className?: string;
  imgSrc?: string;
  fullWidth?: boolean;
}) => {
  const lightBackgroundTypes = ["Electric", "Ice", "Ground", "Steel"];
  const needsDarkText = lightBackgroundTypes.includes(name);

  // Base classes that are always applied
  const badgeClasses = [
    "d-flex",
    "align-items-center",
    styles.pokeBadge,
    styles[className],
  ];

  // Add classes conditionally based on fullWidth prop
  if (fullWidth) {
    badgeClasses.push("w-100", "justify-content-center"); // Add full width and centering only if true
  } else {
    badgeClasses.push("d-inline-flex"); // You might use d-inline-flex if d-flex alone isn't sufficient
  }

  // Add dark text if needed
  if (needsDarkText) {
    badgeClasses.push(styles.textDark);
  }

  return (
    <Badge className={badgeClasses.join(" ")}>
      {imgSrc && (
        <Image
          src={`/images/pokemon/types/transparent/${imgSrc}`}
          alt={`${name} type icon`}
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

export default PokeBadge;
