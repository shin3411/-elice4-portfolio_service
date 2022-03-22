const pagedIndices = ({ total, page, limit}) => {
    const totalN = typeof total === 'number' ? total : Number(total);
    const pageN = typeof page === 'number' ? page : Number(page);
    const limitN = typeof limit === 'number' ? limit : Number(limit);
    const lastPage = Math.floor(totalN/limitN) + 1;
    
    const startIndex = (pageN-1) * limitN;
    if(startIndex > total - 1){
        const errorMessage =
         "해당 페이지는 이미 전체 개수를 넘었습니다.";
        return { errorMessage };
    }
    const lastIndex = lastPage === pageN ? totalN - 1 : pageN * limitN - 1;

    return {
        startIndex,
        lastIndex,
    }
}


export { pagedIndices };