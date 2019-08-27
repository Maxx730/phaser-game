export let STATE = {
    PLAYER: {
		HEALTH: 100,
		EXP: 0,
		LVL: 1
    },
    LOOT: {
        COINS: 0
	},
	QUESTS: [
		{
			TITLE: 'Talk to All Animals',
			COMPLETED: false,
			STARTED: true,
			CONDITIONS: {
				TALK_TO_DOG: {
					ID: 'dog1',
					COMPLETED: false
				},
				TALK_TO_CHICKEN: {
					ID: 'chicken2',
					COMPLETED: false
				}
			}
		}
	]
}