import React, { useState, useEffect, useCallback } from 'react';
import { Box, styled } from '@mui/material';
import { isMobile } from 'react-device-detect';

// 圖片資源
import backgroundImg from '../assets/image/background.jpg';
import personImg from '../assets/image/person.png';
import personWhiteImg from '../assets/image/person-white.png';
import rightEyeImg from '../assets/image/righteye.png';
import leftEyeImg from '../assets/image/lefteye.png';
import textImg from '../assets/image/text.png';

// 然後在物件中使用
const images = {
  background: backgroundImg,
  person: personImg,
  personWhite: personWhiteImg,
  rightEye: rightEyeImg,
  leftEye: leftEyeImg,
  text: textImg,
};

const EYE_MOVEMENT_FACTOR = 10;

// Styled Components
const Container = styled(Box)({
  position: 'relative',
  width: '100%',
});

const BackgroundImage = styled('img')({
  width: '100%',
  verticalAlign: 'middle',
});

const PersonImage = styled('img')(({ theme }) => ({
  width: '77%',
  position: 'absolute',
  left: '6%',
  bottom: 0,
  verticalAlign: 'middle',
  zIndex: 1,
  '@media (max-width: 600px)': {
    left: 0,
    bottom: 0,
  },
}));

const PersonWhiteImage = styled('img')(({ theme }) => ({
  width: '77%',
  position: 'absolute',
  left: '6%',
  bottom: 0,
  verticalAlign: 'middle',
  '@media (max-width: 600px)': {
    left: 0,
    bottom: 0,
  },
}));

const RightEyeImage = styled('img')(({ eyePosition }) => ({
  width: '3.6vw',
  position: 'absolute',
  left: '47%',
  top: '39%',
  transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`,
  transition: 'transform 0.1s ease-out',
  zIndex: 1,
  '@media (max-width: 600px)': {
    width: '16px',
    left: '41%',
    top: '39%',
  },
}));

const LeftEyeImage = styled('img')(({ eyePosition }) => ({
  width: '2.6vw',
  position: 'absolute',
  left: '58%',
  top: '38%',
  transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`,
  transition: 'transform 0.1s ease-out',
  zIndex: 1,
  '@media (max-width: 600px)': {
    width: '13px',
    left: '53%',
    top: '38%',
  },
}));

const TextImage = styled('img')({
  width: '35%',
  position: 'absolute',
  right: 0,
  bottom: '150px',
  animation: 'eyeBlink 1.5s infinite ease-in-out',
  zIndex: 1,
  '@media (max-width: 768px)': {
    width: '30%',
    right: '50px',
    bottom: '25px',
  },
  '@keyframes eyeBlink': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
  },
});

function JobBackGround() {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  // 計算眼睛位置的處理函數
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;


    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);


    const moveX = x * EYE_MOVEMENT_FACTOR;
    const moveY = y * EYE_MOVEMENT_FACTOR;

    setEyePosition({ x: moveX, y: moveY });
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
    window.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  
  return (
    <Container>
      <BackgroundImage src={images.background} alt="background" />
      
        <PersonImage src={images.person} alt="person" />
        <PersonWhiteImage src={images.personWhite} alt="person white" />
        <RightEyeImage 
          src={images.rightEye} 
          alt="right eye" 
          eyePosition={eyePosition}
        />
        <LeftEyeImage 
          src={images.leftEye} 
          alt="left eye" 
          eyePosition={eyePosition}
        />
      
      <TextImage src={images.text} alt="text" />
      
    </Container>
  );
}

export default JobBackGround;