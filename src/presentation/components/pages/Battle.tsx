import { useBattle } from "../../context/battle.context";

export const Battle = () => {
    const { battle, attack } = useBattle();

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="border rounded-sm w-[600px] h-[300px] relative overflow-clip">
                <div>
                    <img className="w-[300px] right-[10px] absolute top-[35px] select-none" src="https://static.wikia.nocookie.net/capx/images/e/ec/Basic_Grass.png" alt="" />
                    <img className="absolute right-[125px] top-[15px] select-none w-[80px]" src={battle.battlePokemon2.pokemonSprite.spriteFrontDefault} alt="player" />
                    <p className="absolute right-[130px] top-[140px]">HP {battle.battlePokemon2.pokemonHp.healthPoints}/{battle.battlePokemon2.pokemonMaxHp.healthPoints}</p>
                </div>

                <div>
                    <p className="absolute left-[130px] bottom-[110px]">HP {battle.battlePokemon1.pokemonHp.healthPoints}/{battle.battlePokemon1.pokemonMaxHp.healthPoints}</p>
                    <img className="w-[300px] absolute bottom-[-5px] select-none" src="https://static.wikia.nocookie.net/capx/images/9/93/Basic_Grassback.png" alt="" />
                    <img className="w-[120px] absolute left-[60px] bottom-[-5px] select-none" src={battle.battlePokemon1.pokemonSprite.spriteBackDefault} alt="player" />
                </div>
            </div>
            <div className="w-[600px] min-h-[50px] p-4 rounded-sm bg-gray-50">
                <p className="text-lg mb-4">What will {battle.battlePokemon1.pokemonName.name} do?</p>
                <div className="grid grid-cols-2 gap-2">
                    {battle.battlePokemon1.pokemonAbilities.abilities.map((ability, index) => (
                        <button key={index} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => attack(ability)}>
                            {ability.abilityName}
                        </button>
                    ))
                    }
                </div>
            </div>
        </div>
    )
};