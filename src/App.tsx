import { CircularProgress, Container, Typography } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Guess from "./components/Guess";
import { createContext, useEffect, useState } from "react";
import { WordleRequestItem, fetchWordleResult } from "./api/api";
import { LoadingButton } from "@mui/lab";

interface GuessContextType {
    guessState: GuessData[];
    setGuessState: React.Dispatch<React.SetStateAction<GuessData[]>>;
}

interface GuessData {
    Letters: Letter[];
}

interface Letter {
    Character: string;
    Color: string;
}

export const GuessContext = createContext<GuessContextType | null>(null);

function App() {
    const [guessResponseHistory, setGuessResponseHistory] = useState<WordleRequestItem[]>([]);
    const [guessState, setGuessState] = useState<GuessData[]>([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
            fetchWordleResult(guessResponseHistory).then(response => {
            const nextGuessArray = response.guess.split('');

            const nextGuess: GuessData = {
                Letters: nextGuessArray.map(character => {
                    return { Character: character, Color: 'white' };
                })
            };
            setGuessState([...guessState, nextGuess ]);
            setLoadingPage(false);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
        // Added this because I was getting a linting warning wanting me to add guessState as a dependency.
        // Maybe I just need to refactor in order to have a better design, but it seems like my current set up works fine and
        // doesn't have anything that would shoot me in the foot or be considered bad practice.
    // eslint-disable-next-line
    }, [guessResponseHistory])

    async function handleOnClick() {
        setLoading(true);
        const currentGuess = guessState.at(-1);
        const charactersInString = currentGuess?.Letters.map(letter => letter.Character).join('');
        const cluesInString = currentGuess?.Letters.map(letter => {
            var firstCharacterOfColor = letter.Color.charAt(0);
            return firstCharacterOfColor === 'w' ? 'x' : firstCharacterOfColor;
        }).join('');

        if (charactersInString != null && cluesInString != null) {
            const request: WordleRequestItem = {
                word: charactersInString,
                clue: cluesInString
            };
            
            const updatedGuessResponseHistory = [...guessResponseHistory, request];
            setGuessResponseHistory(updatedGuessResponseHistory);
        }
    }

    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {loadingPage && <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>}
                {!loadingPage && <GuessContext.Provider value={{guessState, setGuessState}}>
                    {guessState.map((guess, i) =>
                        <Guess key={i} guessIndex={i}></Guess>
                    )}
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <LoadingButton
                            onClick={handleOnClick}
                            loading={loading}
                            loadingPosition="center"
                            variant="contained"
                            >
                            <span>Submit</span>
                        </LoadingButton>
                    </div>
                </GuessContext.Provider>
                }
                {error && <Typography variant="body1" color={'red'}>{error.message}</Typography>}
            </Container>
        </Layout>
    );
}

export default App;
