import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@root/components';
import { sizes } from '@root/theme';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Typography sx={{ fontSize: sizes[64].rem }} align="center">
        404
      </Typography>
      <Typography sx={{ fontSize: sizes[32].rem }} align="center">
        {t('notFoundPage.notFoundMessage')}
      </Typography>
      <Button sx={{ mt: sizes[8].rem }} onClick={() => navigate('/')}>
        {t('notFoundPage.goHomeButton')}
      </Button>
    </Flex>
  );
};

export default NotFoundPage;
