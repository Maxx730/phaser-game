export default class StateHelper {
	constructor(state) {
		this.state = state;
	}

	//Completes a task based on the referenced Quest as well as 
	//the task ID 
	CompleteTask(ref,taskId) {
		this.state.QUESTLINES.map(quest => {
			if(quest.ID === ref) {
				quest.TASKS.map(task => {
					if(task.ID === taskId) {
						task.COMPLETED = true;
						console.log(this.state)
					}
				})
			}
		})
	}
}