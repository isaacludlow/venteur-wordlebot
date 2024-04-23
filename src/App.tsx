import { CircularProgress, Container, Typography } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Guess from "./components/Guess";
import { createContext, useEffect, useState } from "react";
import { WordleRequestItem, fetchWordleResult } from "./api/api";
import { LoadingButton } from "@mui/lab";

interface GuessContext {
    guessState: Guess[];
    setGuessState: React.Dispatch<React.SetStateAction<Guess[]>>;
}

interface Guess {
    Letters: Letter[];
}

interface Letter {
    Character: string;
    Color: string;
}

export const GuessContext = createContext<GuessContext | null>(null);

function App() {
    const [guessResponseHistory, setGuessResponseHistory] = useState<WordleRequestItem[]>([]);
    const [guessState, setGuessState] = useState<Guess[]>([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
            fetchWordleResult(guessResponseHistory).then(response => {
            const nextGuessArray = response.guess.split('');

            const nextGuess: Guess = {
                Letters: nextGuessArray.map(character => {
                    return { Character: character, Color: 'white' };
                })
            };
            setGuessState([...guessState, nextGuess ]);
            setLoadingPage(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });

    }, [])

    async function handleOnClick() {
        setLoading(true);
        const currentGuess = guessState.at(-1);
        const charactersInString = currentGuess?.Letters.map(letter => letter.Character).join('');
        const cluesInString = currentGuess?.Letters.map(letter => {
            var firstCharacterOfColor = letter.Color.charAt(0);
            return firstCharacterOfColor === 'w' ? 'b' : firstCharacterOfColor;
        }).join('');

        if (charactersInString != null && cluesInString != null) {
            const request: WordleRequestItem = {
                word: charactersInString,
                clue: cluesInString
            };
            
            const updatedGuessResponseHistory = [...guessResponseHistory, request];
            setGuessResponseHistory(updatedGuessResponseHistory);
            
            try {
                const response = await fetchWordleResult(updatedGuessResponseHistory);
                const nextGuessArray = response.guess.split('');
    
                const nextGuess: Guess = {
                    Letters: nextGuessArray.map(character => {
                        return { Character: character, Color: 'white' };
                    })
                };
                setGuessState([...guessState, nextGuess ]);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setError((error as Error));
                setLoading(false);
            }
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
