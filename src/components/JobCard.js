import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material';

/**
 * 工作卡片組件
 * @param {Object} job - 工作資料
 * @param {string} job.id - 工作 ID
 * @param {string} job.companyName - 公司名稱
 * @param {string} job.jobTitle - 職位名稱
 * @param {string} job.preview - 工作預覽描述
 * @param {Function} onClick - 點擊卡片回調
 */
function JobCard({ job, educationLabel, salaryLabel, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(job.id);
    }
  };

  return (
    <Card
      sx={{        
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column',width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {job.jobTitle}
            </Typography>
          </Box>
          
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 1.5 }}
          >
            {job.companyName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {job.preview}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
            {educationLabel && (
              <Chip
                label={educationLabel}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {salaryLabel && (
              <Chip
                label={salaryLabel}
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', fontWeight: 600, color: '#EE8927' }}>
            查看細節
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default JobCard;
