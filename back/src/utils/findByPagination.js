//model 과 { query, page, limit } 으로 페이지네이션
async function findbyPagination(model, options) {
	const { query, page, limit } = options;
	return await model.find(query).skip((page - 1) * limit).limit(limit);
}


export { findbyPagination };