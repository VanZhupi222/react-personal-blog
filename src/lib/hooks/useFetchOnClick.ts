import { useCallback } from 'react';

/**
 * 通用点击拉取数据 hook（支持参数）
 * @param fetchData 拉取数据的方法（带参数）
 * @param loading 加载状态
 * @param error 错误信息
 */
export function useFetchOnClick<P = any>({
  fetchData,
  loading,
  error,
}: {
  fetchData: (param: P) => Promise<void>;
  loading: boolean;
  error: any;
}) {
  const handleClick = useCallback(
    async (param: P) => {
      await fetchData(param);
    },
    [fetchData]
  );

  return {
    handleClick,
    loading,
    error,
  };
}
