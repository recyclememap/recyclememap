import styled from '@emotion/styled';

export const RingWrapper = styled('div')({
  position: 'relative',
  width: '50px',
  height: '50px'
});

export const Cutout = styled('div')({
  width: '50%',
  height: '50%',
  backgroundColor: 'white',
  position: 'absolute',
  top: '25%',
  left: '25%',
  borderRadius: '50%',
  pointerEvents: 'none'
});
