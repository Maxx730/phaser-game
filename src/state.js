export let STATE = {
    PLAYER: {
		HEALTH: 100,
		EXP: 0,
		LVL: 1
    },
    LOOT: {
        COINS: 0
	},
	QUESTLINES: [
		{
			ID: 'QUEST_1',
			COMPLETED: false,
			TASKS: [
				{
					ID: 'TASK_1',
					COMPLETED: false,
					DESC: 'Chat with human1 to complete.'
				}
			]
		}
	]
}