import { Button, Typography } from "@mui/material";
import WordBoxRow from "./WordBoxes/WordBoxRow";

const Guess = () => {
    return (
        <>
            <Typography variant="h4" gutterBottom>Guess #1</Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "2.5em", marginBottom: "0.5em" }}>
                <Typography variant="body1" gutterBottom>Word to Guess:</Typography>
                <WordBoxRow />
            </div>
            <Typography variant="body1" gutterBottom>What response did you get back?</Typography>
        
            <div>
                <WordBoxRow />
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained">Submit</Button>
            </div>
        </>
    );
};

export default Guess;
