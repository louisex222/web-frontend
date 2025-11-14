import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Alert,
  Grid,
  styled,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';
import JobDetailDialog from '../components/JobDetailDialog';
import JobBackGround from '../components/JobBackGround';
import {
  getJobList,
  getEducationLevelList,
  getSalaryLevelList,
} from '../services/api';
import {isMobile} from 'react-device-detect';

const ITEMS_PER_PAGE = isMobile ? 4 : 6;

/**
 * 工作列表頁面
 */
function JobListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [salaryList, setSalaryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const filters = {
    company_name: searchParams.get('company_name') || '',
    education_level: searchParams.get('education_level') || '',
    salary_level: searchParams.get('salary_level') || '',
  };

  // 取得教育程度和薪資範圍列表
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [educationData, salaryData] = await Promise.all([
          getEducationLevelList(),
          getSalaryLevelList(),
        ]);
        setEducationList(educationData);
        setSalaryList(salaryData);
      } catch (err) {
        console.error('取得選項列表失敗:', err);
      }
    };
    fetchOptions();
  }, []);

  // 取得工作列表
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        pre_page: ITEMS_PER_PAGE,
        page: currentPage,
        company_name: filters.company_name,
        education_level: filters.education_level,
        salary_level: filters.salary_level,
      };
      
      // 移除空值
      Object.keys(params).forEach((key) => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const data = await getJobList(params);
      setJobs(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError('載入工作列表失敗，請稍後再試');
      console.error('取得工作列表失敗:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters.company_name, filters.education_level, filters.salary_level]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  
// 篩選條件變更
  const handleFilterChange = (newFilters) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', '1');
    
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        newSearchParams.set(key, newFilters[key]);
      }
    });
    
    setSearchParams(newSearchParams);
  };

  // 分頁變更
  const handlePageChange = (event, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', value.toString());
    setSearchParams(newSearchParams);
  };

  // 取得教育程度標籤
  const getEducationLabel = (educationId) => {
    const item = educationList.find((e) => e.id === educationId.toString());
    return item ? item.label : '';
  };

  // 取得薪資標籤
  const getSalaryLabel = (salaryId) => {
    const item = salaryList.find((s) => s.id === salaryId.toString());
    return item ? item.label : '';
  };

  // 點擊工作卡片
  const handleJobCardClick = (jobId) => {
    setSelectedJobId(jobId);
    setDialogOpen(true);
  };

  // 關閉工作詳情彈窗
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedJobId(null);
  };

  // 計算總頁數
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // 工作列表容器
  const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4, 0),
    backgroundColor: 'white',
    border: '1px solid #E6E6E6',
    borderRadius: '10px',
    margin: 'auto',
    position: 'relative',
    bottom: '100px',
    zIndex: 2,
    width: '100%',
    maxWidth: '90%',
    [theme.breakpoints.down('md')]: {
      bottom: 0,
    },
  }));

  // 標題條
  const TitleBar = styled(Box)({
    width: '8px',
    height: 'auto',
    backgroundColor: '#EE8927',
    marginRight: '20px',
    borderRadius: '10px',
  });
  
  return (
  // 工作列表頁面
  <div style={{ position: 'relative', backgroundColor: '#868686'}}>
    <JobBackGround />
    <StyledContainer 
      sx={{ py: 4 }} 
    >
      
      <Typography variant="h5" component="h1" sx={{ mb: 4, fontWeight: 600,display:'flex' }}>
      <TitleBar />
        適合前端工程師的好工作
      </Typography>

      { !isMobile && (<JobFilters
        filters={filters}
        onFilterApply={handleFilterChange}
        educationList={educationList}
        salaryList={salaryList}
      />)}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : jobs.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          目前沒有符合條件的工作
        </Alert>
      ) : (
        <>
          <Box sx={{ mb: 3 }}>
             {!isMobile && (<Typography variant="body2" color="text.secondary">
              共找到 {total} 筆工作
            </Typography>)}
          </Box>

          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} md={4} key={job.id}>
                <JobCard
                  job={job}
                  educationLabel={getEducationLabel(job.educationId)}
                  salaryLabel={getSalaryLabel(job.salaryId)}
                  onClick={handleJobCardClick}
                />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      <JobDetailDialog
        open={dialogOpen}
        jobId={selectedJobId}
        onClose={handleDialogClose}
      />
    </StyledContainer>
    
  </div>
  );
}

export default JobListPage;
