import { Loading, RippleLoading, JumpMusicLoading } from './loading';
// 通过类型断言 转换Loading组件
var TransLoading = Loading;
TransLoading.Ripple = RippleLoading;
TransLoading.JumpMusic = JumpMusicLoading;
export default TransLoading;
