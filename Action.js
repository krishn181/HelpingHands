// import { data } from "react-router-dom";
// import { api } from "../../Config/apiConfig";
// import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS,
//     FIND_PRODUCT_BY_ID_REQUEST,FIND_PRODUCT_BY_ID_SUCCESS,FIND_PRODUCT_BY_ID_FAILURE

//  } from "./ActionType"

// const findProducts = (reqData) => async (dispatch) => {
//     dispatch({ type: FIND_PRODUCTS_REQUEST })
//     const { minPrice, maxPrice, stock, pageNumber, pageSize, minDiscount, category, sort } = reqData;
//     try {
//             const {data} =await api.get(`/api/products/&minPrice${minPrice}/&maxPrice=${maxPrice}/&minDiscount${minDiscount}
//             /category${category}/stock${stock}/sort${sort},/pageNumber${pageNumber}/pageSize${pageSize}`)

//             console.log("product data ",data);
//             dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})


//     } catch (error) {
//         dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message})


//     }
// };

// const findProductsById = (reqData) => async (dispatch) => {
//     dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })
//     const {productId } = reqData;
//     try {
//             const {data} =await api.get(`/api/products/&id${productId}`)

//             dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data})


//     } catch (error) {
//         dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})


//     }
// };

import { api } from "../../Config/apiConfig";
import { 
  FIND_PRODUCTS_FAILURE, 
  FIND_PRODUCTS_REQUEST, 
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE
} from "./ActionType";

const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  
  const { 
    minPrice, 
    maxPrice, 
    stock, 
    pageNumber = 1, 
    pageSize = 10, 
    minDiscount = 0, 
    category, 
    sort = "price_low" 
  } = reqData;
  
  try {
    const { data } = await api.get(
      `/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}` +
      `&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    
    console.log("product data ", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  
  try {
    const { data } = await api.get(`/api/products/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export { findProducts, findProductsById };