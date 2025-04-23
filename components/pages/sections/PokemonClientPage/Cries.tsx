"use client";

// --- React ---
import React from "react";
// --- Font Awesome ---
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
// --- Types ---
import type { Pokemon, NamedAPIResource } from "pokenode-ts";

// --- Audio Playback Function ---
const playCry = (url: string | undefined | null) => {
  if (!url) {
    console.warn("Cry URL is missing.");
    return;
  }
  try {
    console.log("Playing cry:", url);
    const audio = new Audio(url);
    audio.play().catch((error) => {
      console.error("Error playing audio cry:", error);
    });
  } catch (error) {
    console.error("Error creating Audio object for cry:", error);
  }
};

type CriesProps = {
  pokemonName: string;
  apiData: Pokemon;
};

export default function Cries({ pokemonName, apiData }: CriesProps) {
  return (
    <>
      {apiData?.cries && (apiData.cries.latest || apiData.cries.legacy) && (
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="fw-bold">Cries:</span>
            {/* Conditionally render Latest cry button */}
            {apiData.cries.latest && (
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => playCry(apiData.cries.latest)}
                type="button"
                title={`Play ${pokemonName}'s latest cry`}
              >
                Play Latest
                <FontAwesomeIcon icon={faVolumeHigh} className="ms-1" />
              </button>
            )}
            {/* Conditionally render Legacy cry button */}
            {apiData.cries.legacy && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => playCry(apiData.cries.legacy)}
                title={`Play ${pokemonName}'s legacy cry`}
              >
                Play Legacy
                <FontAwesomeIcon icon={faVolumeLow} className="ms-1" />
              </button>
            )}
          </div>
          <hr />
        </div>
      )}
    </>
  );
}
