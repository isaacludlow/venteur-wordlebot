import { Box } from "@mui/material";
import { useContext } from "react";
import { GuessContext } from "../../App";

interface Props {
    guessIndex: number;
}

const GuessWordBoxRow = ({ guessIndex }: Props) => {
    const guessContext = useContext(GuessContext);
    const currentGuess = guessContext?.guessState.at(guessIndex);

    const boxRow = {
        display: "flex",
        gap: "0.5em",
    };

    return (
        <div style={boxRow}>
            {currentGuess?.Letters.map(guessLetter => 
                <Box sx={{ p: 2, border: '1px solid grey' }}>{guessLetter.Character.toUpperCase()}</Box>
            )}
        </div>
    );
};

export default GuessWordBoxRow;