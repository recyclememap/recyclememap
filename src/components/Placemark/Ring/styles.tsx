import styled from '@emotion/styled';

type RingProps = {
  bgColor: string;
};

const Ring = styled.div<RingProps>`
  background-color: ${(props) => props.bgColor};
  position: absolute;
  width: 50%;
  height: 50%;
`;

export const Four0 = styled(Ring)({
  top: 0,
  left: 0,
  borderRadius: '100% 0 0 0'
});

export const Four1 = styled(Ring)({
  top: 0,
  right: 0,
  borderRadius: '0 100% 0 0'
});

export const Four2 = styled(Ring)({
  bottom: 0,
  left: 0,
  borderRadius: '0 0 0 100%'
});

export const Four3 = styled(Ring)({
  bottom: 0,
  right: 0,
  borderRadius: '0 0 100% 0'
});

const Three = styled(Ring)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Three0 = styled(Three)`
  --color-size: calc(100% / 3);
  ${(props: RingProps) => `background: conic-gradient(
    ${props.bgColor} calc(0 * var(--color-size)) calc(1 * var(--color-size)),
    transparent calc(1 * var(--color-size)) calc(2 * var(--color-size)),
    transparent calc(2 * var(--color-size)) calc(3 * var(--color-size))
  );`}
`;

export const Three1 = styled(Three)`
  --color-size: calc(100% / 3);
  ${(props: RingProps) => `background: conic-gradient(
    transparent calc(0 * var(--color-size)) calc(1 * var(--color-size)),
    ${props.bgColor} calc(1 * var(--color-size)) calc(2 * var(--color-size)),
    transparent calc(2 * var(--color-size)) calc(3 * var(--color-size))
  );`}
`;

export const Three2 = styled(Three)`
  --color-size: calc(100% / 3);
  ${(props: RingProps) => `background: conic-gradient(
    transparent calc(0 * var(--color-size)) calc(1 * var(--color-size)),
    transparent calc(1 * var(--color-size)) calc(2 * var(--color-size)),
    ${props.bgColor} calc(2 * var(--color-size)) calc(3 * var(--color-size))
  );`}
`;

const transparentBorder = '25px solid transparent';
const TwoRings = styled(Ring)({
  backgroundColor: 'transparent',
  transform: 'rotate(-45deg)',
  borderRadius: '50%'
});

export const Two0 = styled(TwoRings)`
  border-right: ${(props: RingProps) => `25px solid ${props.bgColor}`};
  border-top: ${(props: RingProps) => `25px solid ${props.bgColor}`};
  border-left: ${transparentBorder};
  border-bottom: ${transparentBorder};
`;

export const Two1 = styled(TwoRings)`
  border-right: ${transparentBorder};
  border-top: ${transparentBorder};
  border-left: ${(props: RingProps) => `25px solid ${props.bgColor}`};
  border-bottom: ${(props: RingProps) => `25px solid ${props.bgColor}`};
`;

export const One = styled(Ring)({
  width: '100%',
  height: '100%',
  borderRadius: '50%'
});
