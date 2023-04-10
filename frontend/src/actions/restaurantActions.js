import axios from "axios";

export const listRestaurantsByCity = (city) => async (dispatch) => {
  try {
    dispatch({ type: "RESTAURANT_LIST_REQUEST" });
    const { data } = await axios.get(
      `http://localhost:3001/api/restaurants/city/${city}`
    );
    dispatch({ type: "RESTAURANT_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "RESTAURANT_LIST_FAIL", payload: error.message });
  }
}