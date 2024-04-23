import { Typography } from "@mui/material";
import GuessWordBoxRow from "./WordBoxes/GuessWordBoxRow";
import ResponseWordBoxRow from "./WordBoxes/ResponseWordBoxRow";

interface Props {
    guessIndex: number;
}

const Guess = ({ guessIndex }: Props) => {
    return (
        <>
            <Typography variant="h4" gutterBottom>Guess #{guessIndex + 1}</Typography>

            <div style={{ display: "flex", alignItems: "center", gap: "2.5em", marginBottom: "0.5em" }}>
                <Typography variant="body1" gutterBottom>Word to Guess:</Typography>
                <GuessWordBoxRow guessIndex={guessIndex} />
            </div>

            <Typography variant="body1" gutterBottom>What response did you get back?</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ResponseWordBoxRow guessIndex={guessIndex} />
            </div>
        </>
    );
};

export default Guess;
