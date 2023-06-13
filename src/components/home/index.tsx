import React from 'react';
import { Box } from '@chakra-ui/react';

const Boards = (): JSX.Element => {
  return (
    <Box minHeight="50vh" flexGrow={3} mx="2%" boxShadow="base" rounded="lg" bg="white" p="1rem">
      <h1>Bạn có thể truy cập trang bảng để xem chức năng WorkFlow.</h1>
    </Box>
  );
};

export default Boards;
