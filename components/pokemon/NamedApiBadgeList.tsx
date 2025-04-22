import React from "react";
// --- Next ---
import Link from "next/link";
// --- Components ---
import SclBadge from "@/components/_silabs/SclBadge";
// --- Types ---
import type { NamedAPIResource } from "pokenode-ts";

/**
 * Renders a list of NamedAPIResources as clickable badges with custom background color.
 *
 * @param {NamedAPIResource[]} items - The array of item objects, e.g., [{ name: string, url: string }]
 * @param {string} url - The link to the page for the badge.
 * @param {string} emptyMessage - The message to display when there are no items.
 * @param {string} className - The override class name (e.g., bgPoke) for the badge background.
 */
export default function NamedApiBadgeList({
  items,
  url,
  emptyMessage = "No items available.",
  className = "",
}: {
  items: NamedAPIResource[];
  url: string;
  emptyMessage?: string;
  className?: string;
}) {
  const moveList = items ?? [];

  // Handle the case where there are no items
  if (moveList.length === 0) {
    return <p className="text-center text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
      {moveList.map((item: NamedAPIResource, index: number) => (
        <Link
          key={item.name}
          href={`${url}?name=${item.name}`}
          className="text-decoration-none"
          passHref
        >
          <SclBadge
            name={item.name}
            badgeOverwrite={
              className ? className : index % 2 === 0 ? "bgPoke" : "bgGray"
            }
          />
        </Link>
      ))}
    </div>
  );
}
