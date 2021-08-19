const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const storeDao = require("./storeDao");

//키워드에 맞는로 매장 검색 API
exports.retrieveStoreByKeywordList = async function (userId, keyword) {

    const connection = await pool.getConnection(async (conn) => conn);
    const storeListByKeywordResult = await storeDao.selectStoreByKeyword(connection, userId, keyword);
    connection.release();

    return storeListByKeywordResult;
};

//카테고리에 해당하는 매장 검색 API
exports.retrieveStoreByCategoryList = async function (userId, category) {

    const connection = await pool.getConnection(async (conn) => conn);
    const storeListByCategoryResult = await storeDao.selectStoreByCategory(connection, userId, category);
    connection.release();

    return storeListByCategoryResult;
};

//메인화면 조회 API
exports.retrieveMainScreenList = async function (userId, type) {
    if(type){
        if(type === 'new'){
            const connection = await pool.getConnection(async (conn) => conn);
            const mainScreenByNewListResult = await storeDao.selectMainScreenByNew(connection,userId);

            connection.release();    
            return mainScreenByNewListResult;
        }    
        else if(type === 'popular'){
            const connection = await pool.getConnection(async (conn) => conn);
            const mainScreenByPopularListResult = await storeDao.selectMainScreenByPopular(connection,userId);
        
            connection.release();    
            return mainScreenByPopularListResult;
        }
    }
    else{
        const connection = await pool.getConnection(async (conn) => conn);

        const mainScreenOtherListResult = await storeDao.selectMainScreenByOther(connection,userId);
        connection.release();    
        return mainScreenOtherListResult;
    }
};

exports.retrieveStoreCategoryList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);

    const storeCategoryListResult = await storeDao.selectStoreCategory(connection);
    connection.release();    
    return storeCategoryListResult;
    
};

