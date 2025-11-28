import { useLocalStorage } from '@vueuse/core';

// 定义默认结构：两个空数组 + 一个默认数值（0）
const DEFAULT_PIE_DATA = {
  array1: [], 
  array2: [], 
  total: 0   
};

export const usePieData = () => {
  // 存储结构化数据到 localStorage，键名为 'pie_data1'
  return useLocalStorage('pie_data', DEFAULT_PIE_DATA);
};