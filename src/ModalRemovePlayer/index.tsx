import { useState, useEffect } from 'react'
import type { Player } from "../types"

interface ModalRemovePlayerProps {
    cancelRemovePlayer: () => void;
    confirmRemovePlayer: () => void;
    playerToRemove: Player;
}

export const ModalRemovePlayer = ({ cancelRemovePlayer, confirmRemovePlayer, playerToRemove }: ModalRemovePlayerProps) => {
    const [removalPhrase, setRemovalPhrase] = useState('')

    const funnyPhrases = [
        "Esse aí não joga nada mesmo...",
        "Já vai tarde, perna de pau!",
        "Até minha avó joga mais.",
        "O time melhora 100% sem ele.",
        "Foi comprar cigarro?",
        "Chinelo cansado...",
        "Nem com 3 pernas ele acerta o gol.",
        "Devolve a chuteira, bagre!",
        "Mais perdido que cego em tiroteio."
    ]

    useEffect(() => {
        const randomPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)]
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRemovalPhrase(randomPhrase)
    }, [funnyPhrases])

    return (
        <div className="modal-overlay" onClick={cancelRemovePlayer}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Quer remover o horrível {playerToRemove.name}?</h2>
                </div>
                <div className="modal-body">
                    <p style={{ fontSize: '1.2rem', margin: '1rem 0', textAlign: 'center' }}>
                        "{removalPhrase}"
                    </p>
                    <div className="modal-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button 
                            className="neobrutal-btn" 
                            onClick={cancelRemovePlayer}
                        >
                            CANCELAR
                        </button>
                        <button 
                            className="neobrutal-btn delete" 
                            onClick={confirmRemovePlayer}
                        >
                            TCHAU!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}