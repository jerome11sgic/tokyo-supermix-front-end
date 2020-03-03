import { combineReducers } from "redux";
import { plantLevelReducers } from "./master/plantlevel/PlantLevelIndex";
import { categoryLevelReducers } from "./master/categorylevel/CatergoryLevelIndex";
import { parameterLevelReducers } from "./master/parameterlevel/ParameterLevelIndex";
import { siteLevelReducers } from "./master/sitelevel/SiteLevelIndex";
import { TopbarNavigationReducer } from "./topbarnavigation/TopbarNavigationReducer";
import { mixDesignLevelReducers } from "./master/mixdesign/MixDesignIndex";
import { samplesReducers } from "./sample/SampleIndex";
import { testResultsReducers } from "./testresults/TestResultIndex";
import { MasterLevelNavigationReducer } from "./topbarnavigation/MasterLevelNavigationReducer";
import { PriviledgeLevelNavigationReducer } from "./topbarnavigation/PriviledgeLevelNavigationReducer";
import { TestConfigurationReducers } from "./testconfiguration/TestConfigurationIndex";

const allReducers = combineReducers({
  plantLevelReducers: plantLevelReducers,
  categoryLevelReducers: categoryLevelReducers,
  parameterLevelReducers: parameterLevelReducers,
  mixDesignLevelReducers: mixDesignLevelReducers,
  siteLevelReducers: siteLevelReducers,
  samplesReducers: samplesReducers,
  topbarNavigationReducers: TopbarNavigationReducer,
  testResultsReducers: testResultsReducers,
  masterLevelNavigationReducer: MasterLevelNavigationReducer,
  priviledgeLevelNavigationReducer: PriviledgeLevelNavigationReducer,
  testConfigurationReducers: TestConfigurationReducers
});

export default allReducers;
