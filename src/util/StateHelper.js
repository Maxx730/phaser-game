export default class StateHelper {
	constructor(state) {
		this.state = state;
	}

	FindAllContaining(id) {
		let quests = new Array();

		Object.keys(this.state.QUESTS).map(quest => {
			Object.keys(this.state.QUESTS[quest].CONDITIONS).map(condition => {
				if(this.state.QUESTS[quest].CONDITIONS[condition].ID === id) {
					quests.push(this.state.QUESTS[quest]);
				}
			});
		});

		return quests;
	}

	FindAllDependingOn(questId) {
		let quests = new Array();

		Object.keys(this.state.QUESTS).map(quest => {
			if(this.state.QUESTS[quest].DEPENDS_ON === questId) {
				quests.push(this.state.QUESTS[quest]);
			}
		});

		return quests;
	}

	AreDependenciesCompleted(dependsId) {
		let satisfied = true;

		Object.keys(this.state.QUESTS).map(quest => {
			if(this.state.QUESTS[quest].ID === dependsId && !this.state.QUESTS[quest].COMPLETED) {
				satisfied = false;
			}
		});

		return satisfied;
	}

	UpdateQuest(quest) {
		console.log(quest)
	}
}