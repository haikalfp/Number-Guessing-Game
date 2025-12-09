import random

def start_game():
    print("Welcome to the Number Guessing Game!")

    while True:
        print("I'm thinking of a number...")

        # Difficulty Levels
        print("\nSelect Difficulty Level:")
        print("1. Easy (1-10)")
        print("2. Medium (1-50)")
        print("3. Hard (1-100)")
        print("4. Impossible (1-1,000,000)")
        print("5. Custom")

        min_num = 1  # Default minimum

        while True:
            try:
                level = int(input("Enter choice (1-5): "))
                if level == 1:
                    max_num = 10
                    break
                elif level == 2:
                    max_num = 50
                    break
                elif level == 3:
                    max_num = 100
                    break
                elif level == 4:
                    max_num = 1000000
                    break
                elif level == 5:
                    while True:
                        try:
                            min_num = int(input("Enter minimum number: "))
                            max_num = int(input("Enter maximum number: "))
                            if min_num < max_num:
                                break
                            else:
                                print("Minimum must be less than maximum. Please try again.")
                        except ValueError:
                            print("Invalid input. Please enter integers.")
                    break
                else:
                    print("Invalid choice. Please enter a number between 1 and 5.")
            except ValueError:
                print("Invalid input. Please enter a number.")

        secret_number = random.randint(min_num, max_num)
        attempts = 0
        print(f"\nGreat! I've picked a number between {min_num} and {max_num}.")

        # Game Loop
        while True:
            try:
                guess = int(input("\nMake a guess: "))
                attempts += 1

                if guess < min_num or guess > max_num:
                    print(f"Please guess a number between {min_num} and {max_num}.")
                    continue

                if guess < secret_number:
                    print("Too low! Try again.")
                elif guess > secret_number:
                    print("Too high! Try again.")
                else:
                    print(f"\nCongratulations! You guessed the number {secret_number} in {attempts} attempts.")
                    break
            except ValueError:
                print("Error: That's not a valid number. Please try again.")

        play_again = input("\nDo you want to play again? (y/n): ").lower()
        if play_again != "y":
            print("Thanks for playing! Goodbye!")
            break

if __name__ == "__main__":
    start_game()
