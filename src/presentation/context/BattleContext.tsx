import React, { useState, createContext, ReactNode } from 'react';
import { Battle, Pokemon } from '../../domain/entities';
import { Id, Name, Types, Level, HealthPoints, Attack, Defense, Abilities, Ability, Sprite } from '../../domain/value-objects';
import { PerformAttack } from '../../domain/services';
import { DamageCalculatorFactory } from '../../domain/services/DamageCalculatorFactory';

interface BattleContextProps {
    battle: Battle;
    attack: (ability: Ability) => void;
}


const BattleContext = createContext({} as BattleContextProps);

interface BattleProviderProps {
    children: ReactNode;
}

const BattleProvider: React.FC<BattleProviderProps> = ({ children }) => {
    const [battle, setBattle] = useState<Battle>(Battle.create(
        new Pokemon(
            Id.create(1),
            Name.create("Charmander"),
            Types.FIRE,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Blaze", "Increases damage when HP is below 1/3rd.", 5),
            new Ability("Solar Power", "Increases damage when HP is below 1/3rd.", 8),
            new Ability(" Warm Blanket", "Increases damage when HP is below 1/3rd.", 6),
            new Ability("Toasty", "Increases damage when HP is below 1/3rd.", 9),
            ]),
            Sprite.create("https://projectpokemon.org/images/normal-sprite/charmander.gif", "https://projectpokemon.org/images/sprites-models/normal-back/charmander.gif")
        ),
        new Pokemon(
            Id.create(2),
            Name.create("Squirtle"),
            Types.WATER,
            Level.create(10),
            HealthPoints.create(50),
            HealthPoints.create(50),
            Attack.create(10),
            Defense.create(10),
            Abilities.create([new Ability("Torrent", "Increases damage when HP is below 1/3rd.", 10),
            new Ability("Rain Dish", "Increases damage when HP is below 1/3rd.", 2),
            new Ability("Shell Armor", "Increases damage when HP is below 1/3rd.", 3),
            new Ability("Toasty", "Increases damage when HP is below 1/3rd.", 4),]),
            Sprite.create("https://projectpokemon.org/images/normal-sprite/squirtle.gif", "https://projectpokemon.org/images/sprites-models/normal-back/squirtle.gif")
        )
    ))

    const attack = (ability: Ability) => {
        const turn = PerformAttack.create(battle.battlePokemon1, battle.battlePokemon2, ability, DamageCalculatorFactory.create())
        setBattle(battle.addTurn(turn))
    }

    return (
        <BattleContext.Provider value={{ battle, attack }}>
            {children}
        </BattleContext.Provider>
    );
};

const useBattle = () => {
    const context = React.useContext(BattleContext);

    if (context === undefined) {
        throw new Error('useBattle must be used within a BattleProvider');
    }

    return context;
}

export { BattleProvider, useBattle };
