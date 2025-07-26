import type { Route } from "./+types/home";
import React, { useState} from "react";
import LeetcodeUsernameForm from "./LeetcodeUsernameForm";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "LeetCode Profile" },
    { name: "description", content: "Displays a user's leetcode stats" },
  ];
}

export default function Home() {
    const handleUsernameSubmit = (username: string) => {
        // Example: log or perform fetch
        console.log("Submitted LeetCode username:", username);
        // You can add more logic here
    };
    return(
        <div>
            <h2>Enter Your LeetCode Username</h2>
            <LeetcodeUsernameForm onSubmit={handleUsernameSubmit} />

        </div>
        );
}
