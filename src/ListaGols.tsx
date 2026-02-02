import { useState } from 'react'
import './ListaGols.css'

interface Player {
  id: string
  name: string
  goals: number
}

function ListaGols() {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerName, setPlayerName] = useState('')
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)

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

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id))
  }

  const openEditModal = (player: Player) => {
    setEditingPlayer({ ...player })
  }

  const closeEditModal = () => {
    setEditingPlayer(null)
  }

  const savePlayerGoals = () => {
    if (!editingPlayer) return
    
    setPlayers(players.map(p => 
      p.id === editingPlayer.id ? editingPlayer : p
    ))
    closeEditModal()
  }

  const updateEditingGoals = (delta: number) => {
    if (!editingPlayer) return
    setEditingPlayer({
      ...editingPlayer,
      goals: Math.max(0, editingPlayer.goals + delta)
    })
  }

  const sortedPlayers = [...players].sort((a, b) => b.goals - a.goals)

  return (
    <div className="container">
      <h1 className="title">Calote FC</h1>
      
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
          {sortedPlayers.map((player) => (
            <li key={player.id} className="player-item">
              <div className="player-bg">
                <div className="goals-control" style={{ marginRight: '1rem', background: 'var(--neo-yellow)' }}>
                    <span className="goals-count">{player.goals}</span>
                </div>
                <span className="player-name">{player.name}</span>
              </div>
              
              <div className="actions">
                <button 
                  onClick={() => openEditModal(player)}
                  className="neobrutal-btn edit"
                >
                  Gols
                </button>

                <button 
                  onClick={() => handleRemovePlayer(player.id)}
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

      {editingPlayer && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPlayer.name}</h2>
            </div>
            
            <div className="modal-body">
              <div className="modal-goals-control">
                <button 
                  className="neobrutal-btn modal-btn-lg"
                  onClick={() => updateEditingGoals(-1)}
                >
                  -
                </button>
                <span className="modal-goals-value">{editingPlayer.goals}</span>
                <button 
                  className="neobrutal-btn modal-btn-lg primary"
                  onClick={() => updateEditingGoals(1)}
                >
                  +
                </button>
              </div>

              <div className="modal-actions">
                <button 
                  className="neobrutal-btn save"
                  onClick={savePlayerGoals}
                >
                  SALVAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListaGols
