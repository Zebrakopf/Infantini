
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from './selection.json';
const expoAssetId = require("../../assets/fonts/icomoon.ttf");
export default createIconSetFromIcoMoon(icoMoonConfig, 'IconFont', expoAssetId);
