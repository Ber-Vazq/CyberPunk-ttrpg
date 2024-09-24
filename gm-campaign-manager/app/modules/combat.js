import React, { useState } from 'react';

// /Users/Bernardo/Desktop/GitHub_Repos/CyberPunk-ttrpg/gm-campaign-manager/app/modules/combat.js


/**
 * CombatInterface
 * This interface will handle combat mechanics in the future.
 * For now, it includes a simple textbox to display combat results.
 */
const CombatInterface = () => {
    const [combatLog, setCombatLog] = useState('');

    /**
     * handleCombat
     * This function will handle combat logic in the future.
     * For now, it just updates the combat log with a sample message.
     */
    const handleCombat = () => {
        const result = 'Combat started! Player attacks enemy for 10 damage.';
        setCombatLog(result);
    };

    return (
        <div>
            <h1>Combat Interface</h1>
            <button onClick={handleCombat}>Start Combat</button>
            <textarea 
                value={combatLog} 
                readOnly 
                rows="10" 
                cols="50"
                placeholder="Combat results will be displayed here..."
            />
        </div>
    );
};

export default CombatInterface;