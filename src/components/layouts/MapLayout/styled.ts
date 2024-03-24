import { css, styled } from '@mui/material/styles';
import { MOBILE_SIDEBAR_HEIGHT } from '@common/constants';
import { sizes } from '@root/theme';

interface StyledWrapperProps {
  isSidebarOpen: boolean;
}

export const StyledMap = styled('div')(
  ({ isSidebarOpen }: StyledWrapperProps) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',

    '& .maplibregl-ctrl-bottom-right': {
      marginRight: sizes[14].rem,
      bottom: isSidebarOpen ? `${MOBILE_SIDEBAR_HEIGHT - 40}px` : '0px',
      transition: 'bottom 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
    }
  })
);

export const mapStyleOverride = css`
  .maplibregl-popup-content {
    border-radius: 12px;
  }

  .maplibregl-canvas {
    outline: none;
  }

  .maplibregl-ctrl-top-left .maplibregl-ctrl {
    margin-left: 16px;
    margin-top: 16px;
    border-radius: 18px;

    form {
      width: 450px !important;
      max-width: 450px !important;
      border-radius: 18px;
    }

    .input-group {
      border-radius: 18px;
    }

    input {
      min-height: 32px;
    }

    @media (max-width: 900px) {
      form {
        width: calc(100vw - 32px) !important;
        max-width: calc(100vw - 32px) !important;
      }
    }
  }
`;
