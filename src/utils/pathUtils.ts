/**
 * 路徑處理工具函數
 */

/**
 * 標準化路徑，移除結尾的斜線（除了根路徑）
 * @param path 原始路徑
 * @returns 標準化後的路徑
 */
export function normalizePath(path: string): string {
  if (path === '/') return path
  return path.endsWith('/') ? path.slice(0, -1) : path
}

/**
 * 判斷路徑是否為首頁
 * @param path 當前路徑
 * @param homePath 首頁路徑
 * @returns 是否為首頁
 */
export function isHomePage(path: string, homePath: string): boolean {
  return normalizePath(path) === homePath
}

/**
 * 比較兩個路徑是否相等（忽略結尾斜線）
 * @param path1 路徑1
 * @param path2 路徑2
 * @returns 是否相等
 */
export function pathsEqual(path1: string, path2: string): boolean {
  return normalizePath(path1) === normalizePath(path2)
}
