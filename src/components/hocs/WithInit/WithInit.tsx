import { Box, Slide, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from '@components/common';
import { Flex } from '@components/containers';
import { IRootStore, useStore } from '@root/store';

export const withInit = (
  domain: keyof IRootStore,
  Children: FunctionComponent
) => {
  const ObserverChildren = observer(Children);

  return observer(({ ...props }: any) => {
    const { t } = useTranslation();
    const stores = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [showServerStartMessage, setShowServerStartMessage] = useState(false);

    useEffect(() => {
      const init = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await stores[domain]?.init();

        setIsLoading(false);
      };

      init();

      const timer = setTimeout(() => setShowServerStartMessage(true), 2000);

      return () => clearTimeout(timer);
      // eslint-disable-next-line
  }, []);

    return isLoading ? (
      // Temporary solution since server is spinning down without receiving inbound traffic
      <Flex
        sx={{
          position: 'relative',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Loader />
        <Slide
          direction="up"
          in={showServerStartMessage}
          mountOnEnter
          unmountOnExit
        >
          <Box sx={{ position: 'absolute', top: '55%' }}>
            <Typography variant="h2" align="center">
              {t('homePage.serverStartTitle')}
            </Typography>
            <Typography align="center">
              {t('homePage.serverStartMessage')}
            </Typography>
          </Box>
        </Slide>
      </Flex>
    ) : (
      <ObserverChildren {...props} />
    );
  });
};
