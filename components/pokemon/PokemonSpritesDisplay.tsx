import React from "react";
import Image from "next/image";
import { Container, Row, Col, Card } from "react-bootstrap";
//Types
import { PokemonTypeSprites } from "@/types/pokemon/Types";

interface PokemonSpritesDisplayProps {
  spritesData: PokemonTypeSprites;
  title?: string;
}

// Helper function to format generation keys (e.g., "generation-i" -> "Generation I")
const formatGenerationName = (key: string): string => {
  const parts = key.split("-");
  if (parts.length === 2) {
    // Capitalize the first part and uppercase the second (likely a Roman numeral)
    return `${
      parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    } ${parts[1].toUpperCase()}`;
  }
  // Fallback for other formats: replace hyphens with spaces and capitalize words
  return key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

// Helper function to format game keys (e.g., "red-blue" -> "Red Blue")
const formatGameName = (key: string): string => {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PokemonSpritesDisplay: React.FC<PokemonSpritesDisplayProps> = ({
  spritesData,
  title = "Pokémon Sprites by Generation",
}) => {
  const generationKeys = Object.keys(spritesData) as Array<
    keyof PokemonTypeSprites
  >;

  // Sort generation keys chronologically (e.g., generation-i, generation-ii, ...)
  const sortedGenerationKeys = generationKeys.sort((a, b) => {
    const getGenNumber = (genKey: string): number => {
      const part = genKey.split("-")[1]; // Get the part after "generation-"
      if (!part) return Infinity; // Handle cases without a number/numeral

      // Map Roman numerals to numbers
      const romanMap: { [key: string]: number } = { i: 1, v: 5, x: 10 };
      const getRomanValue = (roman: string) =>
        roman.split("").reduce((acc, char) => acc + (romanMap[char] || 0), 0);

      // Try parsing as an Arabic numeral first, then as Roman
      const arabicNum = parseInt(part, 10);
      return !isNaN(arabicNum) ? arabicNum : getRomanValue(part.toLowerCase());
    };
    return getGenNumber(a) - getGenNumber(b);
  });

  return (
    <Container fluid className="pokemon-sprites-container">
      {title && <h3 className="mb-3 text-center">{title}</h3>}

      {sortedGenerationKeys.filter(
        (key) => spritesData[key] && Object.keys(spritesData[key]!).length > 0
      ).length === 0 && <p>No sprite data available.</p>}

      <Row>
        {sortedGenerationKeys.map((generationKey) => {
          const gameVersions = spritesData[generationKey];

          // Skip if no game versions data for this generation
          if (!gameVersions) {
            return null;
          }

          // Get game version entries [gameKey, spriteDetail]
          const gameEntries = Object.entries(gameVersions);

          // Skip rendering the column if there are no game entries for this generation
          if (gameEntries.length === 0) {
            return null;
          }

          // Check if there's at least one valid sprite URL in this generation's games
          const hasValidSprites = gameEntries.some(
            ([, spriteDetail]) => spriteDetail?.name_icon
          );

          return (
            <Col key={generationKey} xs={12} md={6} className="mb-4 d-flex">
              <Card className="shadow-sm w-100">
                <Card.Header as="h4">
                  {formatGenerationName(generationKey)}
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  {gameEntries.map(([gameKey, spriteDetail]) => {
                    // Skip this entry if there's no valid sprite icon URL
                    if (!spriteDetail?.name_icon) {
                      return null;
                    }

                    return (
                      <Row
                        key={gameKey}
                        className="mb-2 align-items-center border-bottom pb-2 flex-shrink-0"
                      >
                        <Col xs={12} sm={5} md={4} lg={3}>
                          <strong>{formatGameName(gameKey)}:</strong>{" "}
                        </Col>
                        <Col xs={12} sm={7} md={8} lg={9}>
                          <Image
                            src={spriteDetail.name_icon}
                            alt={`${formatGameName(gameKey)} sprite`}
                            width={55}
                            height={15}
                            loading="lazy"
                            className="ms-2 pixelated-sprite"
                            unoptimized={true}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                  <div className="mt-auto">
                    {!hasValidSprites && (
                      <p className="text-muted fst-italic pt-2 mb-0">
                        No sprites found for this generation&apos;s versions.
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default PokemonSpritesDisplay;
