// req.data에 들어있는 "전체 배열" 을 "특정 page의 배열"로 변환
function pagenationMiddleware(req, res, next) {
    const users = req.data;  //req.data는 반드시 배열이어야 한다.
    const { page, limit } = req.query;


    try {
        //필요한 변수들 선언
        const total = users.length;
        const totalN = typeof total === 'number' ? total : Number(total);
        const pageN = typeof page === 'number' ? page : Number(page);
        const limitN = typeof limit === 'number' ? limit : Number(limit);
        const lastPage = Math.floor(totalN / limitN) + 1;

        const startIndex = (pageN - 1) * limitN;
        if (startIndex > total - 1) {
            const errorMessage =
                "해당 페이지는 이미 전체 개수를 넘었습니다.";
            throw new Error(errorMessage);
        }
        const lastIndex = lastPage === pageN ? totalN - 1 : pageN * limitN - 1;

        const pagedUsers = [];
        for (let i = startIndex; i <= lastIndex; i++) {
            pagedUsers.push(users[i]);
        }

        const ret = { lastPage: lastPage, data: pagedUsers }

        res.status(200).send(ret);
    } catch (error) {
        next(error);
    }
}

export { pagenationMiddleware };