import WordBox from "./WordBox";

const WordBoxRow = () => {
    const boxRow = {
        display: "flex",
        gap: "0.5em",
    };

    return (
        <div style={boxRow}>
            <WordBox letter="S" />
            <WordBox letter="E" />
            <WordBox letter="R" />
            <WordBox letter="A" />
            <WordBox letter="I" />
        </div>
    );
};

export default WordBoxRow;
