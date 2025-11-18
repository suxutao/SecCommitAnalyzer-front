import { useLocalStorage } from '@vueuse/core';

export const useStats = () => {
    // 统一键名和初始值
    return useLocalStorage('stats_data', {
        totalScans: 876,
        securityRate: 96,
        vulnerabilities: 35,
        potentialRisks: 12
    });
};