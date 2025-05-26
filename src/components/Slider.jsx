import React, { useState } from 'react';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Box from '@mui/material/Box';

import IconButton from './IconButton';
import SliderControl from './SliderControl';
import PlayIcon from '@/icons/PlayIcon';
import spinner from '@/images/spinner.svg';

export default props => {
  const { images = [], videos = [], videoThumbnails = [], controls, setCurrent, onChange } = props;

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    animationEnded() {
      if (onChange) {
        onChange();
      }
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      setCurrent(slider.track.details.rel);
    },
  });

  const slidesCount = (images?.length || 0) + (videos?.length || 0);

  return (
    <div ref={sliderRef} className="keen-slider" sx={{ backgroundImage: spinner }}>
      {images.map((src, i) => (
        <Box
          className="keen-slider__slide"
          sx={{
            height: 280,
            objectFit: 'cover',
            background: `url('${spinner}') 50%`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '20%',
            objectPosition: 'top',
          }}
          component="img"
          loading="lazy"
          src={src}
          key={`image-${i}`}
        />
      ))}
      {videos.map((src, i) => (
        <Box className="keen-slider__slide" key={`video-${i}`}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              p: '4px',
              backgroundColor: 'rgba(19, 33, 70, 0.2)',
              borderRadius: '50%',
              width: 'auto',
              zIndex: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
            }}
          >
            <IconButton
              icon={PlayIcon}
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: '50%',
                backgroundColor: 'rgba(19, 33, 70, 0.20) !important',
                color: 'colors.lightGrey',
                p: 0,
                minWidth: 0,

                '&:hover': {
                  color: '#D4D8E0',
                },

                '.MuiSvgIcon-root': {
                  fontSize: '80px',
                },
              }}
            />
          </Box>
          <Box
            component="img"
            loading="lazy"
            src={videoThumbnails[i]}
            sx={{
              height: 280,
              objectFit: 'cover',
              pointerEvents: 'none',
              width: '100%',
            }}
          />
        </Box>
      ))}
      {controls && (
        <Box sx={{ position: 'absolute', bottom: '12px', right: '12px' }}>
          <SliderControl
            to={slidesCount}
            current={currentSlide + 1}
            handleNext={() => {
              instanceRef.current?.next();
            }}
            handlePrev={() => {
              instanceRef.current?.prev();
            }}
          />
        </Box>
      )}
    </div>
  );
};
