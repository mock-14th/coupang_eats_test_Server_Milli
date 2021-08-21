const jwtMiddleware = require("../../../config/jwtMiddleware");
const orderProvider = require("../../app/Order/orderProvider");
const orderService = require("../../app/Order/orderService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 32
 * API Name : 카트에 담기 API
 * [GET] /app/orders/:userId/in-cart
 * path variable : userId
 */
 exports.getCart = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {storeId,menuCount,menuId,orderArray} = req.body; 

    if (!userIdFromJWT || !userId) 
        return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (userIdFromJWT != userId) {
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if(!storeId)
            return res.send(errResponse(baseResponse.SIGNIN_STOREID_EMPTY));
        if(!menuId)
            return res.send(errResponse(baseResponse.SIGNIN_MENUID_EMPTY));
            
        const getOrderId = await orderService.postUserOrder(userId, storeId, menuId, menuCount);
        for(let i=0; i<orderArray.length; i++){
            if(!orderArray[i].menuCategoryId)
                return res.send(errResponse(baseResponse.SIGNIN_MENUCATEGORYID_EMPTY));
            if(!orderArray[i].menuDetailId)
                return res.send(errResponse(baseResponse.SIGNIN_MENUDETAILID_EMPTY));
            const postOrderDetailList = await orderService.postOrderDetail(getOrderId[0].orderIdx, orderArray[i]);
        }
        return res.send(response(baseResponse.SUCCESS)); 
    }  
}