import { Tag } from 'lucide-react';
import { Box } from '@chakra-ui/react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: boolean;
}

export function Badge({ children, icon = false }: BadgeProps) {
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      gap={1}
      background="#f3f4f6"
      color="#1f2937"
      px={3}
      py={1}
      borderRadius="md"
      fontWeight={500}
      fontSize="sm"
    >
      {icon && <Tag style={{ width: 14, height: 14 }} />}
      {children}
    </Box>
  );
}
