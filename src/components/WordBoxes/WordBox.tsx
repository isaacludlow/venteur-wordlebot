import { Box } from "@mui/material"

interface Props {
    character: string;
    color: string;
    onClick: (letter: string) => void;
}

const WordBox = ({ character, color, onClick }: Props) => {
   


    return (
        <Box sx={{ p: 2, border: '1px solid grey', backgroundColor: color }} onClick={() => onClick(character)}>{character.toUpperCase()}</Box>
    );
};

export default WordBox;
