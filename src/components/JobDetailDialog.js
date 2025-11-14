import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Slide,
} from '@mui/material';
import { getJobDetail } from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 公司照片輪播組件
function FcImgCarousel({ photo }) {
  return ( 
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}           // 圖片間隔
        slidesPerView={3}            // 顯示 3 個
        pagination={{ clickable: true }}  // 可點擊的圓點
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 10
          }
        }}
      >
        {photo.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img} 
              alt={`${index + 1}`}
              loading="lazy"
              style={{ width: '100%', height: 'auto', }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * 工作詳情彈窗組件
 * @param {boolean} open - 彈窗是否開啟
 * @param {string} jobId - 工作 ID
 * @param {Function} onClose - 關閉彈窗回調
 */
function JobDetailDialog({ open, jobId, onClose }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && jobId) {
      const fetchJobDetail = async () => {
        setLoading(true);
        setError(null);
        setJob(null);
        
        try {
          const data = await getJobDetail(jobId);
          if (!data || Object.keys(data).length === 0) {
            setError('找不到此工作資訊');
          } else {
            setJob(data);
          }
        } catch (err) {
          setError('載入工作詳情失敗，請稍後再試');
          console.error('取得工作詳情失敗:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchJobDetail();
    } else {
      // 關閉時重置狀態
      setJob(null);
      setError(null);
      setLoading(false);
    }
  }, [open, jobId]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            工作詳情
          </Typography>
         
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : job ? (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
                {job.jobTitle}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {job.companyName}
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  公司照片
            </Typography>
            {job.companyPhoto && job.companyPhoto.length > 0 && (
              <Box sx={{ mb: 4,width: '100%', maxWidth: '100%',
                '.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal ': {
                  position:'relative',
                },
                // 可選：非 active 的 dot 樣式
                '.swiper-pagination-bullet':{
                  background:'#ccc',
                  width:'10px',
                  height:'10px',
                  borderRadius:'5px',
                  opacity:0.5,
                  transition:'all 0.3s ease',
                  
                },
                '.swiper-pagination-bullet-active':{
                  background:'#EE8927',
                  width:'30px',
                  borderRadius:'10px',
                  opacity:1,
                  transition:'all 0.3s ease',
                },
               }}>
              
                <FcImgCarousel photo={job.companyPhoto} />
              </Box>
            )}

            {job.description && (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  工作描述
                </Typography>
                <Box
                  sx={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    pr: 1,
                    '& h1': { fontSize: '1.5rem', fontWeight: 600, mb: 2 },
                    '& h2': { fontSize: '1.25rem', fontWeight: 600, mb: 1.5, mt: 2 },
                    '& ul': { pl: 3, mb: 2 },
                    '& li': { mb: 1 },
                    '& p': { mb: 2 },
                    '& a': { color: 'primary.main' },
                  }}
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </Box>
            )}
          </Box>
        ) : null}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Box sx={{ flex: 1 }} />
        <Button onClick={handleClose} color="text">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default JobDetailDialog;
