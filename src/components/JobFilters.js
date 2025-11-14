import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

/**
 * 工作篩選組件
 * @param {Object} filters - 當前生效的篩選條件
 * @param {Function} onFilterApply - 應用篩選條件回調
 * @param {Array} educationList - 教育程度列表
 * @param {Array} salaryList - 薪資範圍列表
 */
function JobFilters({ filters, onFilterApply, educationList, salaryList }) {
  const [localFilters, setLocalFilters] = useState({
    company_name: '',
    education_level: '',
    salary_level: '',
  });

  // 當外部 filters 改變時，同步到本地狀態
  useEffect(() => {
    setLocalFilters({
      company_name: filters.company_name || '',
      education_level: filters.education_level || '',
      salary_level: filters.salary_level || '',
    });
  }, [filters]);

  const handleChange = (field, value) => {
    setLocalFilters({
      ...localFilters,
      [field]: value,
    });
  };

  const handleApply = () => {
    onFilterApply(localFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      company_name: '',
      education_level: '',
      salary_level: '',
    };
    setLocalFilters(clearedFilters);
    onFilterApply(clearedFilters);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="公司名稱"
            variant="outlined"
            value={localFilters.company_name || ''}
            onChange={(e) => handleChange('company_name', e.target.value)}
            placeholder="請輸入公司名稱"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleApply();
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>教育程度</InputLabel>
            <Select
              value={localFilters.education_level || ''}
              label="教育程度"
              onChange={(e) => handleChange('education_level', e.target.value)}
            >
              <MenuItem value="">全部</MenuItem>
              {educationList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>薪資範圍</InputLabel>
            <Select
              value={localFilters.salary_level || ''}
              label="薪資範圍"
              onChange={(e) => handleChange('salary_level', e.target.value)}
            >
              <MenuItem value="">全部</MenuItem>
              {salaryList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={1.5}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleApply}
            sx={{ height: '56px' }}
          >
            條件搜尋
          </Button>
        </Grid>

        <Grid item xs={12} md={1.5}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            sx={{ height: '56px' }}
          >
            清除
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default JobFilters;
