// components/Pokedex.js
import React from "react";
import styles from "@/public/styles/components/Pokedex.module.css"; // Import the CSS Module
import { Container, Row, Col } from "react-bootstrap"; // Optional: Use if needed for internal layout

const Pokedex = ({ pokemonData }) => {
  // pokemonData is a placeholder prop for future data fetching
  // Example structure: { name: 'Bulbasaur', id: '001', sprite: 'url_to_sprite', description: '...' }

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
                <img
                  src={pokemonData.sprite || "/placeholder-sprite.png"} // Provide a default/placeholder
                  alt={pokemonData.name || "Pokemon"}
                  className={styles.pokemonSprite}
                />
                <div className={styles.pokemonInfo}>
                  <h3>{pokemonData.name || "POKEMON NAME"}</h3>
                  <p>ID: #{pokemonData.id || "000"}</p>
                  {/* Add more details here */}
                </div>
              </>
            ) : (
              <div className={styles.placeholderText}>
                Awaiting Pokemon Data...
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
