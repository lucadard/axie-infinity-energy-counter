function EnergyCounter() {
    const [counter, setCounter] = React.useState({
        energy: 3,
        round: 1,
        cards: 6,
        lastAction: ''
    });
    const [animationState, setAnimationState] = React.useState({
        energyChange: false,
        counterReset: false,
        cardsChange: false
    });

    function add() {
        if (counter.energy < 10) {
            setCounter({
                ...counter,
                energy: counter.energy + 1,
                lastAction: 'plus'
            });
            setAnimationState({
                ...animationState,
                energyChange: true
            })
        }
    }
    function subtract() {
        if (counter.energy > 0) {
            setCounter({
                ...counter,
                energy: counter.energy - 1,
                lastAction: 'minus'
            });
            setAnimationState({
                ...animationState,
                energyChange: true
            })
        }
    }
    function nextRound() {
        let energy = counter.energy < 9 ? counter.energy + 2 : 10;
        let cards = counter.cards < 13 ? counter.cards + 3 : 15;
            setCounter({
                round: counter.round + 1,
                energy: energy,
                cards: cards,
                lastAction: 'next'
            });
        setAnimationState({
            ...animationState,
            energyChange: true
        });
    }
    function reset() {
        if (!(counter.energy == 3 && counter.round == 1 && counter.cards == 6)) {
            setCounter({
                energy: 3,
                round: 1,
                cards: 6,
                lastAction: ''
            })
            setAnimationState({
                ...animationState,
                counterReset: true
            })
        }
    }
    function addCard() {
        if (counter.cards < 15) {
            setCounter({
                ...counter,
                cards: counter.cards + 1,
                lastAction: 'plus'
            });
            setAnimationState({
                ...animationState,
                cardsChange: true
            })
        }
    }
    function subtractCard() {
        if (counter.cards > 0) {
            setCounter({
                ...counter,
                cards: counter.cards - 1,
                lastAction: 'minus'
            });
            setAnimationState({
                ...animationState,
                cardsChange: true
            })
        }
    }

    function animationMsg() {
        if (counter.lastAction === 'plus')
            return '+';
        if (counter.lastAction === 'minus')
            return '-';
        if (counter.lastAction === 'next')
            return '>>';
    }
    return (
        <div id="counter">
            <div id="round">
                <h1>Round {counter.round}</h1>
            </div>
            <div id="energy" onAnimationEnd={() => setAnimationState({ energyChange: false, counterReset: false })} className={`${animationState.counterReset ? 'resetAnimation' : ''}`}>
                <span class="currentEnergy">{counter.energy}</span>
                <span class="separator">/</span>
                <span class="maxEnergy">10</span>
                <div id="animation" className={`${animationState.energyChange ? counter.lastAction : ''}`}>
                    <span>{animationMsg()}</span>
                </div>
            </div>
            <div class="buttons">
                <button onClick={subtract}><span>-</span></button>
                <button onClick={add}><span>+</span></button>
                <button onClick={nextRound}><span>Next Round</span></button>
                <button onClick={reset}><span>Reset</span></button>
            </div>
            <div id="cards" onAnimationEnd={() => setAnimationState({ cardsChange: false })}>
                <span class="currentCards">{counter.cards}</span>
                <div id="animation" className={`${animationState.cardsChange ? counter.lastAction : ''}`}>
                    <span>{animationMsg()}</span>
                </div>
            </div>
            <div class="cardButtons">
                <button onClick={subtractCard}><span>-</span></button>
                <button onClick={addCard}><span>+</span></button>
            </div>
        </div>
    );
};

ReactDOM.render(<EnergyCounter />, document.getElementById("counter-wrapper"));