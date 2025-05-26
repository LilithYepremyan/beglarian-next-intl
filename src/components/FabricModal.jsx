import React, { useEffect, useState } from 'react';

import 'keen-slider/keen-slider.min.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useKeenSlider } from 'keen-slider/react';

import IconButton from './IconButton';
import SliderControl from './SliderControl';
import CloseIcon from '@/icons/CloseIcon';
import spinner from '@/images/spinner.svg';
import { events, track, Track } from '@/metrics';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  overflow: 'hidden',
  transform: 'translate(-50%, -50%)',
};

export default function FabricModal(props) {
  const { images = [], videos = [], videoThumbnails = [], isOpen, close, article, initial } = props;

  const [currentSlide, setCurrentSlide] = useState();

  const sliderOptions = {
    loop: true,
    animationEnded() {
      track(events.modals.fabric.slider.changed);
    },
    slideChanged(slider) {
      const currentSlideEl = slider.slides[slider.track.details.rel];

      setCurrentSlide(slider.track.details.rel);

      if (currentSlideEl && currentSlideEl.play) {
        const playPromise = currentSlideEl.play();

        if (playPromise !== undefined) {
          playPromise.catch(_ => {});
        }
      }

      slider.slides
        .filter(x => x !== currentSlideEl)
        .forEach(x => {
          if (x.pause) {
            x.pause();
          }
        });
    },
  };

  const [sliderRef, instanceRef] = useKeenSlider(sliderOptions);

  useEffect(() => {
    setCurrentSlide(initial);

    setTimeout(() => {
      instanceRef.current?.update(sliderOptions, initial);
    }, 0);
  }, [isOpen]);

  return (
    <Modal disableAutoFocus={true} disableEnforceFocus={true} open={isOpen} onClose={close}>
      <Box sx={style}>
        <Box
          sx={{
            backgroundColor: 'colors.white',
            position: 'relative',
            overflow: 'hidden',
            '@media (min-aspect-ratio: 3/4)': { height: '80vh !important', width: '60vh !important' },
            '@media (max-aspect-ratio: 3/4)': { height: '126vw !important', width: '95vw !important' },
          }}
          ref={sliderRef}
          className="keen-slider"
        >
          <IconButton
            icon={CloseIcon}
            onClick={close}
            variant="contained"
            color="secondary"
            sx={{
              zIndex: 1,
              top: '16px',
              right: '16px',
              position: 'absolute',
              borderRadius: '50%',
              p: 1,
              minWidth: 0,
            }}
          />
          {images.map((src, i) => (
            <Box
              // /sx={{ background: `url(${thumbnails[i]}) top left / cover no-repeat` }}
              key={`image-${i}`}
              sx={{
                background: `url('${spinner}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '20%',
                backgroundPosition: 'center',
              }}
              component="img"
              src={src}
              loading="lazy"
              className="keen-slider__slide"
            ></Box>
          ))}
          {videos.map((src, i) => (
            <Box
              sx={{
                background: `url(${videoThumbnails[i]}) top center / 70% 100% no-repeat`,
                '@media (min-aspect-ratio: 3/4)': { height: '100%' },
                '@media (max-aspect-ratio: 3/4)': { width: '100%' },
              }}
              className="keen-slider__slide"
              key={`video-${i}`}
              component="video"
              controls
              loading="lazy"
              preload="none"
              playsInline
              src={src}
            />
          ))}
        </Box>

        <Box
          sx={{
            background: '#fff',
            p: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2">{article}</Typography>
          <Box>
            <SliderControl
              to={images.length + videos.length}
              current={currentSlide + 1}
              handleNext={() => instanceRef.current?.next()}
              handlePrev={() => instanceRef.current?.prev()}
              inset={false}
            />
          </Box>
        </Box>

        <Track eventName={events.modals.fabric.shown} />
      </Box>
    </Modal>
  );
}
