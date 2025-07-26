import React, { useState } from "react";


interface LeetcodeFormProps {
  onSubmit: (username: string) => void;
}

export default function LeetcodeUsernameForm({ onSubmit }: LeetcodeUsernameFormProps){
    const [username, setUsername] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
      };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userSlug = username;
        const query = `
              query userProfile($username: String!, $userSlug: String!) {
                allQuestionsCount {
                  difficulty
                  count
                }
                matchedUser(username: $username) {
                  username
                  githubUrl
                  linkedinUrl
                  profile {
                    realName
                    ranking
                    userAvatar
                  }
                  submitStats {
                    acSubmissionNum {
                      difficulty
                      count
                    }
                  }
                  languageProblemCount {
                    languageName
                    problemsSolved
                  }
                }
                userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                  numAcceptedQuestions {
                    count
                    difficulty
                  }
                  numFailedQuestions {
                    count
                    difficulty
                  }
                  numUntouchedQuestions {
                    count
                    difficulty
                  }
                  userSessionBeatsPercentage {
                    difficulty
                    percentage
                  }
                  totalQuestionBeatsPercentage
                }}`;
        const variables = {
                  username: username,
                  userSlug: userSlug
        };
        try {
              const response = await fetch('http://localhost:4000/leetcode-graphql', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // Add other headers if needed, e.g., 'Accept': 'application/json'
                },
                body: JSON.stringify({
                  query,
                  variables
                }),
              });
      const data = await response.json();
            onSubmit(username); // optional: callback to parent with username
            console.log("GraphQL response:", data);
            // You can do further processing or pass data up here.
          } catch (error) {
                    console.error("Error fetching LeetCode profile:", error);
                  }
      };
    return(
       <form onSubmit={handleSubmit}>
        <label htmlFor="leetcode-username">LeetCode Username:</label>
        <input
            id="leetcode-username"
            name="leetcodeUsername"
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter your LeetCode username"
            autoComplete="off"
        />
        <button type="submit">Submit</button>
       </form>
        );
    }