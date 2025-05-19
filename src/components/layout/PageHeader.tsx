import { Box, Heading, Text } from '@chakra-ui/react';

interface PageHeaderProps {
  heading: string;
  text?: string;
}

export function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <Box mb={8}>
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={2}>
        {heading}
      </Heading>
      {text && <Text color="gray.500" fontSize="lg">{text}</Text>}
    </Box>
  );
}
