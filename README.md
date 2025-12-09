# Number Guessing Game

A feature-rich **Number Guessing Game** available in two versions: a classic **Python CLI** and a modern, responsive **Web Interface**. Challenge yourself with 5 difficulty levels, track your attempts, and customize your gameplay experience.

## Features
- **Difficulty Levels**: Choose from Easy (1-10), Medium (1-50), Hard (1-100), Impossible (1-1,000,000), or Custom (User Defined).
- **Hints**: The game tells you if your guess is "too high" or "too low".
- **Attempt Tracking**: See how many tries it took you to win.
- **Play Again**: Option to replay the game immediately after finishing.
- **Error Handling**: Gracefully handles non-numeric inputs.

## How to Run

### Python Version
1.  Make sure you have Python installed.
2.  Open your terminal or command prompt.
3.  Navigate to the directory containing `number_guess.py`.
4.  Run the game:
    ```bash
    python number_guess.py
    ```

### Web Version
1.  Navigate to the project folder.
2.  Double-click `index.html` to open it in your web browser.

## Example Gameplay
```text
Welcome to the Number Guessing Game!
I'm thinking of a number...

Select Difficulty Level:
1. Easy (1-10)
2. Medium (1-50)
3. Hard (1-100)
Enter choice (1, 2, or 3): 1

Great! I've picked a number between 1 and 10.

Make a guess: 5
Too low! Try again.

Make a guess: 8
Congratulations! You guessed the number 8 in 2 attempts.
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
