export const constants = {
	GAME: {
		WIDTH: 250,
		HEIGHT:170,
		TILESIZE: 32,
		DEBUG: true,
		MAPSIZE: {
			LARGE: {
				WIDTH: 50,
				HEIGHT: 50
			},
			SMALL: {
				WIDTH: 10,
				HEIGHT: 10
			}
		}
	},
	SCENES: {
		MENUS: {

		},
		TOWNS: {
			TOWNONE:{
				ID:'TownOne',
				NPCS: [
					{
						ID: 'human1',
						MESSAGES: [
							{
								ID: 0,
								REF: 'QUEST_1',
								COMPLETES: 'TASK_1',
								LINES:[
									{
										CONTENT: ['TEST LINE 1']
									},
									{
										CONTENT: ['TEST LINE 2']
									},
									{
										CONTENT: ['TEST LINE 3']
									}
								]
							}
						]
					},
					{
						ID: 'human2',
						MESSAGES: [
							{
								ID: 0,
								REF: 'QUEST_1',
								DEPENDS: 'TASK_1',
								LINES:[
									{
										CONTENT: ['Look At That']
									},
									{
										CONTENT: ['You completed your first Task!']
									}
								]
							}
						]
					}
				]				
			}
		},
		Routes: {
			
		}
	}
}