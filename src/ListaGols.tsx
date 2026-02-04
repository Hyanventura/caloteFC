import { useState } from 'react'
import './ListaGols.css'
import { ModalAddGoals } from './ModalAddGoals'
import { ModalRemovePlayer } from './ModalRemovePlayer'

interface Player {
  id: string
  name: string
  goals: number
}

function ListaGols() {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerName, setPlayerName] = useState('')
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [playerToRemove, setPlayerToRemove] = useState<Player | null>(null)

  const handlePlayerAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName.trim()) return

    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: playerName,
      goals: 0
    }

    setPlayers([...players, newPlayer])
    setPlayerName('')
  }

  const confirmRemovePlayer = () => {
    if (playerToRemove) {
        setPlayers(players.filter(p => p.id !== playerToRemove.id))
        setPlayerToRemove(null)
    }
  }

  const savePlayerGoals = (goals: number) => {
    if (!editingPlayer) return
    
    setPlayers(players.map(p => 
      p.id === editingPlayer.id ? { ...p, goals } : p
    ))
    setEditingPlayer(null)
  }

  const sortedPlayers = [...players].sort((a, b) => b.goals - a.goals)

  if (playerToRemove) return <ModalRemovePlayer
    cancelRemovePlayer={() => setPlayerToRemove(null)}
    confirmRemovePlayer={confirmRemovePlayer}
    playerToRemove={playerToRemove}
  />
  if (editingPlayer) return <ModalAddGoals
    closeEditModal={() => setEditingPlayer(null)}
    editingPlayer={editingPlayer}
    savePlayerGoals={savePlayerGoals}
  />
  
  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handlePlayerAdd} className="player-form">
          <input 
            type="text" 
            placeholder="Nome do Jogador" 
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="neobrutal-input"
          />
          <button type="submit" className="neobrutal-btn primary">
            Adicionar
          </button>
        </form>

        <ul className="player-list">
          {sortedPlayers.map((player, index) => (
            <li key={player.id} className="player-item">
              <div className="player-bg">
                {index < 3 && (
                    <div className={`rank-badge rank-${index + 1}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="7"></circle>
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                        </svg>
                    </div>
                )}
                <div className="goals-control" style={{ marginRight: '1rem', background: 'var(--neo-yellow)' }}>
                    <span className="goals-count">{player.goals}</span>
                </div>
                <span className="player-name">{player.name}</span>
              </div>
              
              <div className="actions">
                <button 
                  onClick={() => setEditingPlayer(player)}
                  className="neobrutal-btn edit"
                >
                  Gols
                </button>

                <button 
                  onClick={() => setPlayerToRemove(player)}
                  className="neobrutal-btn icon-btn delete"
                  aria-label="Remover jogador"
                  title="Remover jogador"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </li>
          ))}
          {players.length === 0 && (
            <li className="empty-state">Nenhum jogador escalado</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ListaGols
