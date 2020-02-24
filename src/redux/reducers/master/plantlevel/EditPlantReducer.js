import {
  SWITCH_TO_EDIT_MODE,
  DISABLE_EDIT_MODE
} from "../../../action/master/plantlevel/PlantLevel";

const initialState = {
  visible: false,
  editPlantData: [],
  type: "add"
};

export const EditPlantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_TO_EDIT_MODE:
      console.log(action.payload);
      return {
        ...state,
        visible: (state.visible = true),
        //setting the payload data to the global redux state names editPlantData
        editPlantData: (state.editPlantData = action.payload),
        type: (state.type = "edit")
      };
    case DISABLE_EDIT_MODE:
      return {
        ...state,
        // clearing the states
        visible: (state.visible = false),
        editPlantData: (state.editPlantData = []),
        type: (state.type = "add")
      };

    default:
      return state;
  }
};
