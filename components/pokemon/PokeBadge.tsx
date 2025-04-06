import React from "react";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";
//Helpers
import { formatName } from "@/helpers/formatName";
//Styles
import styles from "@/public/styles/modules/typeBadges.module.css";

const PokeBadge = ({
  name,
  className,
  imgSrc = "",
}: {
  name: string;
  className: string;
  imgSrc?: string;
}) => {
  const lightBackgroundTypes = ["Electric", "Ice", "Ground", "Steel"];
  const needsDarkText = lightBackgroundTypes.includes(name);

  // Construct the className array using the 'styles' object
  let badgeClasses = [
    "w-100 d-flex align-items-center justify-content-center",
    styles.pokeBadge,
    styles[className],
  ];

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
      {formatName(name)}
    </Badge>
  );
};

export default PokeBadge;
