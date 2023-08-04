import styled from '@emotion/styled';

type RingProps = {
  bgColors: string[];
};

const getBackground = (bgColors: string[]) => {
  const colorSize = bgColors.length;
  const gradient = bgColors.map(
    (color, idx) =>
      `${color} ${idx * (100 / colorSize)}% ${(idx + 1) * (100 / colorSize)}%`
  );

  return `background: conic-gradient(${gradient.join(',')});`;
};

export const RingWrapper = styled('div')({
  position: 'relative',
  width: '50px',
  height: '50px'
});

export const Ring = styled.div<RingProps>`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  ${(props: RingProps) => `${getBackground(props.bgColors)}`}
`;

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
