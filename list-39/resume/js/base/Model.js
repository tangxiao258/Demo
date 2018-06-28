function Model(options){
	let resourceName = options.resourceName
	return {
		init(){
			var APP_ID = '42t87AhMXsEIpGjWzmym0Utq-gzGzoHsz';
            var APP_KEY = '664M4Yi9RJfUl4IGgL6b9zYi';

			AV.init({
			  appId: APP_ID,
			  appKey: APP_KEY
			});
		},
		fetch(){
			var query = new AV.Query(resourceName)
			return query.find()
		},
		save(object){
			var XXX = AV.Object.extend(resourceName);
			var xxx = new XXX();
			return xxx.save(object)
		}
	}
}