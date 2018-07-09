window.eventHub = {
	events:{
		//'羊城晚报':[],
	},
	on(eventName, fn){ // 订阅
		if(this.events[eventName] === undefined){
			this.events[eventName] = []
		}
		this.events[eventName].push(fn)
	},
	emit(eventName, data){ // 发布
		for(let key in this.events){
			if(eventName === key){
				let fnList = this.events[key]
				fnList.map((fn) => {
					fn.call(undefined, data)
				})
			}
		}
	}
}