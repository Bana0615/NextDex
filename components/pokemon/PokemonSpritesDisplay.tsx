import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { PokemonTypeSprites } from "@/types/pokemon/TypeSprite";

interface PokemonSpritesDisplayProps {
  spritesData: PokemonTypeSprites;
  title?: string;
}

const formatGenerationName = (key: string): string => {
  const parts = key.split("-");
  if (parts.length === 2) {
    return `${
      parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    } ${parts[1].toUpperCase()}`;
  }
  return key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

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

  const sortedGenerationKeys = generationKeys.sort((a, b) => {
    const getGenNumber = (genKey: string): number => {
      const part = genKey.split("-")[1];
      if (!part) return Infinity;
      const romanMap: { [key: string]: number } = { i: 1, v: 5, x: 10 };
      const getRomanValue = (roman: string) =>
        roman.split("").reduce((acc, char) => acc + (romanMap[char] || 0), 0);
      const arabicNum = parseInt(part, 10);
      return !isNaN(arabicNum) ? arabicNum : getRomanValue(part.toLowerCase());
    };
    return getGenNumber(a) - getGenNumber(b);
  });

  return (
    <Container fluid className="pokemon-sprites-container">
      {title && <h2 className="mb-3">{title}</h2>}

      {sortedGenerationKeys.length === 0 && <p>No sprite data available.</p>}

      {sortedGenerationKeys.map((generationKey) => {
        const gameVersions = spritesData[generationKey];

        if (!gameVersions) {
          return null;
        }

        const gameEntries = Object.entries(gameVersions);

        if (gameEntries.length === 0) {
          return null;
        }

        const hasValidSprites = gameEntries.some(
          ([, spriteDetail]) => spriteDetail?.name_icon
        );

        return (
          <Card key={generationKey} className="mb-4 shadow-sm">
            <Card.Header as="h4">
              {formatGenerationName(generationKey)}
            </Card.Header>
            <Card.Body>
              {gameEntries.map(([gameKey, spriteDetail]) => {
                if (!spriteDetail?.name_icon) {
                  return null;
                }

                return (
                  <Row
                    key={gameKey}
                    className="mb-2 align-items-center border-bottom pb-2"
                  >
                    <Col xs={12} sm={5} md={4} lg={3}>
                      <strong>{formatGameName(gameKey)}:</strong>{" "}
                    </Col>
                    <Col xs={12} sm={7} md={8} lg={9}>
                      <img
                        src={spriteDetail.name_icon}
                        alt={`${formatGameName(gameKey)} sprite`}
                        style={{
                          width: "40px",
                          height: "auto",
                          imageRendering: "pixelated",
                          verticalAlign: "middle",
                        }}
                        className="ms-2"
                        loading="lazy"
                      />
                    </Col>
                  </Row>
                );
              })}
              {!hasValidSprites && (
                <p className="text-muted fst-italic">
                  No sprites found for this generation's versions.
                </p>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

export default PokemonSpritesDisplay;
