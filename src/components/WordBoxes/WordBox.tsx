import { Box } from "@mui/material"

interface Props {
    letter: string;
}

const WordBox = ({ letter }: Props) => {
    return (
        <Box sx={{ p: 2, border: '1px solid grey' }}>{letter}</Box>
    );
};

export default WordBox;
