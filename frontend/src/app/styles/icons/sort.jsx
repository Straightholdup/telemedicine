import React from "react";

export const SortIcon = ({flagPrice}) => {
    return(
        <svg width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
                  stroke={flagPrice ? "#000000" : "#21A038" }
                  strokeWidth={flagPrice ? 1.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
            />
        </svg>
    )
}