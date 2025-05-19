import { Box, Heading, Text, Flex } from '@chakra-ui/react';

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <Box
      bg="popover"
      borderRadius="lg"
      borderWidth={1}
      borderColor="border"
      p={6}
      boxShadow="md"
      className="dark:bg-popover dark:border-border"
    >
      {children}
    </Box>
  );
}

export function CardHeader({ children }: CardProps) {
  return (
    <Flex mb={4} align="flex-start" justify="space-between">
      {children}
    </Flex>
  );
}

export function CardTitle({ children }: CardProps) {
  return (
    <Heading as="h3" size="md" fontWeight="semibold" className="text-foreground">
      {children}
    </Heading>
  );
}

export function CardDescription({ children }: CardProps) {
  return (
    <Text className="text-muted-foreground">
      {children}
    </Text>
  );
}

export function CardContent({ children }: CardProps) {
  return <Box>{children}</Box>;
}
