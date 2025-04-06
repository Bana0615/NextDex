import React from "react";
import Image from "next/image";
//Styles
import styles from "@/public/styles/components/Pokedex.module.css";

const Pokedex = ({ pokemonData }) => {
  return (
    <div className={styles.pokedex}>
      {/* Top Section (Lights & Hinge) */}
      <div className={styles.topSection}>
        <div className={styles.hinge}></div>
        <div className={styles.lightsContainer}>
          <div className={`${styles.light} ${styles.blueLight}`}></div>
          <div className={`${styles.light} ${styles.redLight}`}></div>
          <div className={`${styles.light} ${styles.yellowLight}`}></div>
          <div className={`${styles.light} ${styles.greenLight}`}></div>
        </div>
      </div>

      {/* Middle Section (Screen) */}
      <div className={styles.middleSection}>
        <div className={styles.screenBorder}>
          <div className={styles.screen}>
            {pokemonData ? (
              <>
                <Image
                  src={
                    pokemonData.sprite || "/images/pokedex/question_mark.png"
                  }
                  alt={pokemonData.name || "Pokémon"}
                  className={styles.pokemonSprite}
                  height={16}
                  width={16}
                />
                <div className={styles.pokemonInfo}>
                  <h3>{pokemonData.name || "POKEMON NAME"}</h3>
                  <p>ID: #{pokemonData.id || "000"}</p>
                  {/* Add more details here */}
                </div>
              </>
            ) : (
              <div className={styles.placeholderText}>
                Awaiting Pokémon Data...
              </div>
            )}
          </div>
        </div>
        {/* Little red lights below screen */}
        <div className={styles.screenBottomLights}>
          <div
            className={`${styles.smallButton} ${styles.smallRedButton}`}
          ></div>
          <div
            className={`${styles.smallButton} ${styles.smallRedButton}`}
          ></div>
        </div>
      </div>

      {/* Bottom Section (Buttons & Speaker) */}
      <div className={styles.bottomSection}>
        <div className={styles.controls}>
          <div className={styles.largeBlueButton}></div>
          <div className={styles.greenRectButton}></div>
          <div className={styles.orangeRectButton}></div>
          <div className={styles.dPad}></div>{" "}
          {/* D-pad styled with pseudo-elements */}
        </div>
        <div className={styles.speakerGrill}>
          <div className={styles.speakerLine}></div>
          <div className={styles.speakerLine}></div>
          <div className={styles.speakerLine}></div>
          <div className={styles.speakerLine}></div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
