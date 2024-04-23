import { useContext, useState } from "react";
import WordBox from "./WordBox";
import { GuessContext } from "../../App";

interface Props {
    guessIndex: number;
}

const ResponseWordBoxRow = ({ guessIndex }: Props) => {
    const guessContext = useContext(GuessContext);
    const currentGuess = guessContext?.guessState.at(guessIndex);
    const colors = ['white', 'green', 'yellow'];

    function toggleColor(currentColor: string) {
        const currentIndex = colors.indexOf(currentColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        const nextColor = colors[nextIndex];

        return nextColor;
    };

    function handleOnClick(character: string) {
        if (currentGuess) {
            var letters = [...currentGuess.Letters];
            var letter = letters.find(letter => letter.Character === character);
            if (letter) letter.Color = toggleColor(letter.Color);
            currentGuess.Letters = letters;

            if (guessContext) {
                const updatedGuessState = [...guessContext.guessState];
                updatedGuessState[updatedGuessState.length - 1] = currentGuess;
                guessContext.setGuessState(updatedGuessState);
            }
        }
    }

    const boxRow = {
        display: "flex",
        gap: "0.5em",
    };

    return (
        <div style={boxRow}>
            {currentGuess?.Letters.map((letter, i) =>
                <WordBox key={letter.Character} character={letter.Character} color={letter.Color} onClick={handleOnClick} />
            )}
        </div>
    );
};

export default ResponseWordBoxRow;
