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
			ID: 0,
			COMPLETED: false,
			STARTED: false,
			CONDITIONS: {
				TALK_TO_DOG: {
					ID: 'dog1',
					COMPLETED: false
				},
				TALK_TO_CHICKEN: {
					ID: 'chicken1',
					COMPLETED: false
				}
			}
		},
		{
			TITLE: 'Talk to All Humans',
			ID: 1,
			DEPENDS_ON: 0,
			COMPLETED: false,
			STARTED: false,
			CONDITIONS: {
				TALK_TO_HUMAN1: {
					ID: 'human1',
					COMPLETED: false
				},
				TALK_TO_HUMAN2: {
					ID: 'human2',
					COMPLETED: false
				}
			}
		},
		{
			TITLE: 'Ask About Karol',
			ID: 2,
			DEPENDS_ON: 1,
			COMPLETED: false,
			STARTED: false,
			CONDITIONS: {
				TALK_TO_HUMAN1: {
					ID: 'human1',
					COMPLETED: false
				}
			}
		},
		{
			TITLE: 'Feed the Dog',
			ID: 3,
			DEPENDS_ON: 0,
			COMPLETED: false,
			STARTED: false,
			CONDITIONS: {
				TALK_TO_DOG: {
					ID: 'dog1',
					COMPLETED: false
				}
			}
		}
	]
}