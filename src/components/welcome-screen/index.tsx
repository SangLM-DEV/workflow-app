import React from 'react';
import NavBar from '@/src/components/navbar';
import { Box, Image, Flex, Text } from '@chakra-ui/react';

const WelcomeScreen = (): JSX.Element => {
  return (
    <>
      <Box bgGradient="linear(darkblue, white)" height="100vh">
        <NavBar />
        <Flex
          alignItems="center"
          flexDirection={['column', 'column', 'row', 'row']}
          justifyContent="center"
          p="4rem">
          <Box>
            <Text fontSize={['40px', '40px', '50px', '50px']} fontWeight="bold" lineHeight="50px">
              WorkFlow giúp các nhóm tiến hành công việc.
            </Text>
            <Text
              fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
              width={['100%', '100%', '50%', '50%']}>
              Cộng tác, quản lý dự án và đạt đến đỉnh năng suất mới. Từ nhà cao tầng đến văn phòng
              tại nhà, cách nhóm của bạn làm việc là duy nhất - hoàn thành tất cả với WorkFlow.
            </Text>
          </Box>
          <Box>
            <Image
              height={['200px', '300px', '400px', '500px']}
              src="/homepage/home-illustration.svg"
              alt="brand logo"></Image>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default WelcomeScreen;
