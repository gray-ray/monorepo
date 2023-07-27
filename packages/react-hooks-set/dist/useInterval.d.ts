/**
 * 验证码倒计时
 */
export type UseIntervalProps = {
    distance?: number;
};
declare const useInterval: (props?: UseIntervalProps) => {
    seconds: number;
    startCount: () => void;
    disabled: boolean;
};
export default useInterval;
