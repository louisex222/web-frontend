/**
 * API 服務層
 * 用於呼叫 Mock API
 */

const API_BASE_URL = '/api/v1';

/**
 * 取得工作列表
 * @param {Object} params - 查詢參數
 * @param {number} params.pre_page - 每頁顯示筆數
 * @param {number} params.page - 指定頁面頁數
 * @param {string} params.company_name - 公司名稱
 * @param {number} params.education_level - 教育程度 id
 * @param {number} params.salary_level - 薪資範圍 id
 * @returns {Promise<Object>} 工作列表資料
 */
export const getJobList = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      queryParams.append(key, params[key]);
    }
  });

  const url = `${API_BASE_URL}/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('取得工作列表失敗');
  }
  
  return response.json();
};

/**
 * 取得教育程度列表
 * @returns {Promise<Array>} 教育程度列表
 */
export const getEducationLevelList = async () => {
  const response = await fetch(`${API_BASE_URL}/educationLevelList`);
  
  if (!response.ok) {
    throw new Error('取得教育程度列表失敗');
  }
  
  return response.json();
};

/**
 * 取得薪資範圍列表
 * @returns {Promise<Array>} 薪資範圍列表
 */
export const getSalaryLevelList = async () => {
  const response = await fetch(`${API_BASE_URL}/salaryLevelList`);
  
  if (!response.ok) {
    throw new Error('取得薪資範圍列表失敗');
  }
  
  return response.json();
};

/**
 * 取得單一工作資訊
 * @param {string} id - 工作 ID
 * @returns {Promise<Object>} 工作資訊
 */
export const getJobDetail = async (id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
  
  if (!response.ok) {
    throw new Error('取得工作詳情失敗');
  }
  
  return response.json();
};
