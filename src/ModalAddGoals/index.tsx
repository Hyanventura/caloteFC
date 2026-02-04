import { useState } from 'react'
import type { Player } from "../types"

interface ModalAddGoalsProps {
    closeEditModal: () => void;
    editingPlayer: Player;
    savePlayerGoals: (goals: number) => void;
}

export const ModalAddGoals = ({ closeEditModal, editingPlayer, savePlayerGoals }: ModalAddGoalsProps) => {
    const [localGoals, setLocalGoals] = useState(editingPlayer.goals)

    const updateGlobalGoals = (delta: number) => {
        setLocalGoals(prev => Math.max(0, prev + delta))
    }

     return(
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPlayer.name}</h2>
            </div>
            
            <div className="modal-body">
              <div className="modal-goals-control">
                <button 
                  className="neobrutal-btn modal-btn-lg"
                  onClick={() => updateGlobalGoals(-1)}
                >
                  -
                </button>
                <span className="modal-goals-value">{localGoals}</span>
                <button 
                  className="neobrutal-btn modal-btn-lg primary"
                  onClick={() => updateGlobalGoals(1)}
                >
                  +
                </button>
              </div>

              <div className="modal-actions">
                <button 
                  className="neobrutal-btn save"
                  onClick={() => savePlayerGoals(localGoals)}
                >
                  SALVAR
                </button>
              </div>
            </div>
          </div>
        </div>
    )}